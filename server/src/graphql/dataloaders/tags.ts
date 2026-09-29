import DataLoader from 'dataloader'
import mongoose from 'mongoose'

import { BooksModel, BookTagRelationsModel } from '../../models/index.js'
import { toObjectMapping } from '../../utils/mappers.js'
import { Book, BookTagRelations } from '../generated/types.js'

export const TagsDL = {
  booksInTag: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObjDocs = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagObj = toObjectMapping<BookTagRelations>(booksInTagObjDocs)
    const booksInTagIds = booksInTagObj.map((item) => item.bookID)
    const booksDocs = await BooksModel.find({ _id: { $in: booksInTagIds } }).sort({ title: 1 })
    const books = toObjectMapping<Book>(booksDocs)

    return tagIDs.map((id) =>
      books.filter((book) =>
        booksInTagObj.find((item) => item.bookID === book.id && item.tagID === id),
      ),
    )
  }),

  booksInTagByAuthor: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObjDocs = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagObj = toObjectMapping<BookTagRelations>(booksInTagObjDocs)
    const booksInTagIds = booksInTagObj.map((item) => new mongoose.Types.ObjectId(item.bookID))
    const booksDocs = await BooksModel.aggregate([
      {
        $match: { _id: { $in: booksInTagIds } },
      },
      {
        $lookup: {
          as: 'authorData',
          foreignField: '_id',
          from: 'authors',
          localField: 'authorID',
        },
      },
      { $unwind: '$authorData' },
      { $addFields: { authorSurname: '$authorData.surname' } },
      {
        $sort: { authorSurname: 1, title: 1 },
      },
      { $addFields: { id: '$_id' } },
      {
        $project: {
          _id: 0,
          authorData: 0,
          authorSurname: 0,
        },
      },
    ])

    const books = booksDocs.map((item) => ({
      ...item,
      authorID: item.authorID.toString(),
      id: item.id.toString(),
    }))

    const bookMap = new Map(books.map((book) => [book.id, book]))

    const tagToBooksMap = new Map<string, typeof books>()

    for (const relation of booksInTagObj) {
      const book = bookMap.get(relation.bookID)
      if (!book) continue

      const tagIdStr = relation.tagID.toString()
      if (!tagToBooksMap.has(tagIdStr)) {
        tagToBooksMap.set(tagIdStr, [])
      }
      tagToBooksMap.get(tagIdStr)!.push(book)
    }

    return tagIDs.map((id) => tagToBooksMap.get(id) || [])
  }),
}

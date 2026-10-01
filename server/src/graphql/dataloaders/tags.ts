import DataLoader from 'dataloader'
import mongoose from 'mongoose'

import { BooksModel, BookTagRelationsModel } from '../../models/index.js'
import { mapOneToMany, toObjectMapping } from '../../utils/mappers.js'
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
    const tagObjectIds = tagIDs.map((id) => new mongoose.Types.ObjectId(id))

    const aggregatedResults = await BookTagRelationsModel.aggregate([
      {
        $match: {
          tagID: { $in: tagObjectIds },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookID',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
      {
        $lookup: {
          from: 'authors',
          localField: 'book.authorID',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },
      {
        $sort: {
          'author.surname': 1,
          'book.title': 1,
        },
      },
      {
        $project: {
          tagID: { $toString: '$tagID' },
          book: {
            $mergeObjects: [
              '$book',
              {
                id: { $toString: '$book._id' },
                authorID: { $toString: '$book.authorID' },
                seriesID: {
                  $cond: {
                    if: { $ifNull: ['$book.seriesID', false] },
                    then: { $toString: '$book.seriesID' },
                    else: '$$REMOVE',
                  },
                },
                _id: '$$REMOVE',
              },
            ],
          },
        },
      },
    ])

    return mapOneToMany(aggregatedResults, tagIDs, (row) => row.tagID).map((group) =>
      group.map((row) => row.book),
    )
  }),
}

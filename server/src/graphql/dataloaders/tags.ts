import DataLoader from 'dataloader'
import { BooksModel, BookTagRelationsModel } from '#models/index.js'
import { toObjectMapping } from '#utils/mappers.js'
import { BookTagRelations, Book } from '#graphql/generated/types.js'

export const TagsDL = {
  booksInTag: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObjDocs = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagObj = toObjectMapping<BookTagRelations>(booksInTagObjDocs)
    const booksInTagIds = booksInTagObj.map((item) => item.bookID)
    const booksDocs = await BooksModel.find({ _id: { $in: booksInTagIds } }).sort({ title: 1 })
    const books = toObjectMapping<Book>(booksDocs)

    return tagIDs.map((id) =>
      books.filter((book) =>
        booksInTagObj.find((item) => item.bookID === book.id && item.tagID === id.toString()),
      ),
    )
  }),

  booksInTagByAuthor: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObjDocs = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagObj = toObjectMapping<BookTagRelations>(booksInTagObjDocs)
    const booksInTagIds = booksInTagObj.map((item) => item.bookID)
    const booksDocs = await BooksModel.aggregate([
      {
        $match: { _id: { $in: booksInTagIds } },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorID',
          foreignField: '_id',
          as: 'authorData',
        },
      },
      { $unwind: '$authorData' },
      { $addFields: { authorSurname: '$authorData.surname' } },
      {
        $sort: { authorSurname: 1, title: 1 },
      },
      { $project: { authorSurname: 0, authorData: 0 } },
    ])
    const books = toObjectMapping<Book>(booksDocs)

    return tagIDs.map((id) =>
      books.filter((book) =>
        booksInTagObj.find((item) => item.bookID === book.id && item.tagID === id.toString()),
      ),
    )
  }),
}

import DataLoader from 'dataloader'

import { BooksModel, BookTagRelationsModel } from '#models/index.js'

export const TagsDL = {
  booksInTag: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObj = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagIds = booksInTagObj.map((item) => item.bookID)
    const books = await BooksModel.find({ _id: { $in: booksInTagIds } }).sort({ title: 1 })

    return tagIDs.map((id) =>
      books.filter((book) =>
        booksInTagObj.find(
          (item) =>
            item.bookID?.toString() === book._id?.toString() &&
            item.tagID?.toString() === id.toString(),
        ),
      ),
    )
  }),

  booksInTagByAuthor: new DataLoader(async (tagIDs: readonly string[]) => {
    const booksInTagObj = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } })
    const booksInTagIds = booksInTagObj.map((item) => item.bookID)
    const books = await BooksModel.aggregate([
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

    return tagIDs.map((id) =>
      books.filter((book) =>
        booksInTagObj.find(
          (item) =>
            item.bookID?.toString() === book._id?.toString() &&
            item.tagID?.toString() === id.toString(),
        ),
      ),
    )
  }),
}

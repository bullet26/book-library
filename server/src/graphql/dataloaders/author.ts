import DataLoader from 'dataloader'

import { BooksModel, SeriesModel } from '../../models/index.js'
import { mapOneToMany, toObjectMapping } from '../../utils/mappers.js'
import { Book, Series } from '../generated/types.js'

export const AuthorDL = {
  books: new DataLoader(async (authorIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 })
    const books = toObjectMapping<Book>(booksDocs)

    return mapOneToMany(books, authorIDs, (book) => book.authorID.toString())
  }),

  booksWithoutSeries: new DataLoader(async (authorIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({
      $and: [{ authorID: { $in: authorIDs } }, { seriesID: null }],
    }).sort({ title: 1 })
    const books = toObjectMapping<Book>(booksDocs)

    return mapOneToMany(books, authorIDs, (book) => book.authorID.toString())
  }),

  series: new DataLoader(async (authorIDs: readonly string[]) => {
    const seriesDocs = await SeriesModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 })
    const series = toObjectMapping<Series>(seriesDocs)

    return mapOneToMany(series, authorIDs, (serie) => serie.authorID.toString())
  }),
}

import DataLoader from 'dataloader'

import { BooksModel } from '../../models/index.js'
import { mapOneToMany, toObjectMapping } from '../../utils/mappers.js'
import { Book } from '../generated/types.js'

export const SeriesDL = {
  booksInSeries: new DataLoader(async (seriesIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({ seriesID: { $in: seriesIDs } }).sort({
      seriesNumber: 1,
    })
    const books = toObjectMapping<Book>(booksDocs)
    return mapOneToMany(books, seriesIDs, (item) => item.seriesID!.toString())
  }),
}

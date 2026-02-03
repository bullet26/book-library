import DataLoader from 'dataloader'

import { BooksModel } from '../../models/index.js'
import { toObjectMapping } from '../../utils/mappers.js'
import { Book } from '../generated/types.js'

export const SeriesDL = {
  booksInSeries: new DataLoader(async (seriesIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({ seriesID: { $in: seriesIDs } }).sort({
      seriesNumber: 1,
    })
    const books = toObjectMapping<Book>(booksDocs)

    return seriesIDs.map((id) => books.filter((item) => item.seriesID === id))
  }),
}

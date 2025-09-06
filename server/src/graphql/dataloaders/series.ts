import DataLoader from 'dataloader'
import { BooksModel } from '#models/index.js'

export const SeriesDL = {
  booksInSeries: new DataLoader(async (seriesIDs: readonly string[]) => {
    const books = await BooksModel.find({ seriesID: { $in: seriesIDs } }).sort({ seriesNumber: 1 })
    return seriesIDs.map((id) => books.filter((item) => item.seriesID.toString() === id.toString()))
  }),
}

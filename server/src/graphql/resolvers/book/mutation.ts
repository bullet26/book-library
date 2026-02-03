import { BooksModel, DescriptionPlotModel, ReadDateModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type MutationResolvers } from '../../generated/types.js'

export const BookMutation: MutationResolvers = {
  addBook: async (_, { input }, context) => {
    const { seriesID, ...data } = input

    const bookDoc = await BooksModel.create({ ...data, seriesID: seriesID ?? undefined })
    const book = toObjectMappingSingle<Book>(bookDoc)

    if (Object.hasOwn(input, 'readEnd') && !!input.readEnd) {
      await ReadDateModel.create({
        bookID: book.id,
        readEnd: input.readEnd,
      })
    }

    if (Object.hasOwn(input, 'plot') && !!input.plot) {
      await DescriptionPlotModel.create({
        bookID: book.id,
        plot: input.plot,
      })
    }

    if (seriesID) {
      context.dataloaders.book.series.clear(seriesID) // clear DataLoader cache for series of this book
    }

    return book
  },
}

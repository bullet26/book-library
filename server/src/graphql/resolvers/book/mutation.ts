import { BooksModel, DescriptionPlotModel, ReadDateModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type MutationResolvers } from '../../generated/types.js'

export const BookMutation: MutationResolvers = {
  addBook: async (_, { input }) => {
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
    return book
  },
}

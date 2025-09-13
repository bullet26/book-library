import { BooksModel, DescriptionPlotModel, ReadDateModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type MutationResolvers } from '../../generated/types.js'

export const BookMutation: MutationResolvers = {
  addBook: async (_, { input }) => {
    const bookDoc = await BooksModel.create(input)
    const book = toObjectMappingSingle<Book>(bookDoc)

    if (input.hasOwnProperty('readEnd') && !!input.readEnd) {
      await ReadDateModel.create({
        bookID: book.id,
        readEnd: input.readEnd,
      })
    }
    if (input.hasOwnProperty('plot') && !!input.plot) {
      await DescriptionPlotModel.create({
        bookID: book.id,
        plot: input.plot,
      })
    }
    return book
  },
}

import { type Book, type MutationResolvers } from '#graphql/generated/types.js'
import { AdditionalMediaModel, BooksModel } from '#models/index.js'
import { HttpError } from '#utils/http-error.js'
import { toObjectMappingSingle } from '#utils/mappers.js'

export const AdditionalMediaMutation: MutationResolvers = {
  addAdditionalMedia: async (_, { input }) => {
    const promises = input.map((item) => AdditionalMediaModel.create(item))
    await Promise.all(promises)
    const bookID = input[0]?.bookID
    if (!bookID) throw new HttpError('BookID is required', 400)

    const book = await BooksModel.findById(bookID)
    if (!book) throw new HttpError('Book wasn`t found', 404)

    return toObjectMappingSingle<Book>(book)
  },
}

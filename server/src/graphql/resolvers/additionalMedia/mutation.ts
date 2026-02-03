import { AdditionalMediaModel, BooksModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type MutationResolvers } from '../../generated/types.js'

export const AdditionalMediaMutation: MutationResolvers = {
  addAdditionalMedia: async (_, { input }, context) => {
    await AdditionalMediaModel.insertMany(input)

    const bookID = input[0]?.bookID
    if (!bookID) throw new HttpError('BookID is required', 400)

    const book = await BooksModel.findById(bookID)
    if (!book) throw new HttpError('Book wasn`t found', 404)

    context.dataloaders.book.additionalMedia.clear(bookID) // clear DataLoader cache for additionalMedia of this book

    return toObjectMappingSingle<Book>(book)
  },
}

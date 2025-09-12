import { BookTagRelationsModel, BooksModel } from '../../../models/index.js'
import { Book, type MutationResolvers } from '../../generated/types.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { HttpError } from '../../../utils/http-error.js'

export const TagsMutation: MutationResolvers = {
  linkBookWithTag: async (_, { input }) => {
    await BookTagRelationsModel.deleteMany({ bookID: input.bookID })

    await Promise.all(
      input.tagID.map(
        async (item) => await BookTagRelationsModel.create({ bookID: input.bookID, tagID: item }),
      ),
    )

    const bookDoc = await BooksModel.findById(input.bookID)
    if (!bookDoc) throw new HttpError('Book not found', 404)

    return toObjectMappingSingle<Book>(bookDoc)
  },
}

import { BooksModel, BookTagRelationsModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { Book, type MutationResolvers } from '../../generated/types.js'

export const TagsMutation: MutationResolvers = {
  linkBookWithTag: async (_, { input }, context) => {
    await BookTagRelationsModel.deleteMany({ bookID: input.bookID })

    await Promise.all(
      input.tagID.map(
        async (item) => await BookTagRelationsModel.create({ bookID: input.bookID, tagID: item }),
      ),
    )

    context.dataloaders.book.tags.clear(input.bookID) // clear DataLoader cache for tags of this book

    const bookDoc = await BooksModel.findById(input.bookID)
    if (!bookDoc) throw new HttpError('Book not found', 404)

    return toObjectMappingSingle<Book>(bookDoc)
  },
}

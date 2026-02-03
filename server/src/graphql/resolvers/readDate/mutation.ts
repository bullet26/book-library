import { type MutationResolvers, type ReadDate } from '../../../graphql/generated/types.js'
import { ReadDateModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'

export const ReadDateMutation: MutationResolvers = {
  addReadDate: async (_, { input }, context) => {
    const bookDoc = await ReadDateModel.create({
      bookID: input.bookID,
      readEnd: input.readEnd,
    })

    context.dataloaders.book.readDate.clear(input.bookID) // clear DataLoader cache for readDate of this book

    return toObjectMappingSingle<ReadDate>(bookDoc)
  },
}

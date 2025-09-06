import { ReadDateModel } from '#models/index.js'
import { type ReadDate, type MutationResolvers } from '#graphql/generated/types.js'
import { toObjectMappingSingle } from '#utils/mappers.js'

export const ReadDateMutation: MutationResolvers = {
  addReadDate: async (_, { input }) => {
    const bookDoc = await ReadDateModel.create({
      bookID: input.bookID,
      readEnd: input.readEnd,
    })
    return toObjectMappingSingle<ReadDate>(bookDoc)
  },
}

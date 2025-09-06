import { ReadDateModel } from '#models/index.js'
import { type MutationResolvers } from '#graphql/generated/types.js'

export const ReadDateMutation: MutationResolvers = {
  addReadDate: async (_, { input }) => {
    try {
      const book = await ReadDateModel.create({
        bookID: input.bookID,
        readEnd: input.readEnd,
      })
      return book
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}

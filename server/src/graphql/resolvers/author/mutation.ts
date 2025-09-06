import { type MutationResolvers } from '#graphql/generated/types.js'
import { AuthorModel } from '#models/index.js'

export const AuthorMutation: MutationResolvers = {
  createAuthor: async (_, { input }) => {
    try {
      return await AuthorModel.create(input)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}

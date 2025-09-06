import { SeriesModel } from '#models/index.js'
import { type MutationResolvers } from '#graphql/generated/types.js'

export const SeriesMutation: MutationResolvers = {
  createSerie: async (_, { input }) => {
    try {
      return await SeriesModel.create(input)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}

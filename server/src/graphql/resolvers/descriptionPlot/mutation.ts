import { DescriptionPlotModel } from '#models/index.js'
import { type MutationResolvers } from '#graphql/generated/types.js'

export const DescriptionPlotMutation: MutationResolvers = {
  addBookPlot: async (_, { input }) => {
    try {
      return await DescriptionPlotModel.create(input)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}

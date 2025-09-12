import { DescriptionPlotModel } from '../../../models/index.js'
import { type DescriptionPlot, type MutationResolvers } from '../../../graphql/generated/types.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'

export const DescriptionPlotMutation: MutationResolvers = {
  addBookPlot: async (_, { input }) => {
    const descriptionDoc = await DescriptionPlotModel.create(input)
    return toObjectMappingSingle<DescriptionPlot>(descriptionDoc)
  },
}

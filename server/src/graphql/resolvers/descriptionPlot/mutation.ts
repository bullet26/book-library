import { type DescriptionPlot, type MutationResolvers } from '../../../graphql/generated/types.js'
import { DescriptionPlotModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'

export const DescriptionPlotMutation: MutationResolvers = {
  addBookPlot: async (_, { input }) => {
    const descriptionDoc = await DescriptionPlotModel.create(input)
    return toObjectMappingSingle<DescriptionPlot>(descriptionDoc)
  },

  updateBookPlot: async (_, { input }) => {
    const { bookID, id, plot } = input

    const descriptionDoc = await DescriptionPlotModel.findOneAndUpdate(
      { _id: id, bookID },
      { plot },
      { returnDocument: 'after' },
    )

    if (!descriptionDoc) {
      throw new HttpError("Book description wasn't found", 404)
    }

    return toObjectMappingSingle<DescriptionPlot>(descriptionDoc)
  },
}

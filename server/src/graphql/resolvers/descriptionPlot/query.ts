import { DescriptionPlotModel } from '../../../models/index.js'
import { type DescriptionPlot, type QueryResolvers } from '../../../graphql/generated/types.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'

export const DescriptionPlotQuery: QueryResolvers = {
  getOneBookPlot: async (_, args) => {
    const { bookID } = args
    if (!bookID) throw new HttpError('Book ID is required', 400)

    const [bookDoc] = await DescriptionPlotModel.find({ bookID })
    if (!bookDoc) return null

    return toObjectMappingSingle<DescriptionPlot>(bookDoc)
  },
}

import { SeriesModel } from '../../../models/index.js'
import { type Series, type MutationResolvers } from '../../generated/types.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'

export const SeriesMutation: MutationResolvers = {
  createSerie: async (_, { input }) => {
    const serieDoc = await SeriesModel.create(input)
    return toObjectMappingSingle<Series>(serieDoc)
  },
}

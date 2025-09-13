import { SeriesModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type MutationResolvers, type Series } from '../../generated/types.js'

export const SeriesMutation: MutationResolvers = {
  createSerie: async (_, { input }) => {
    const serieDoc = await SeriesModel.create(input)
    return toObjectMappingSingle<Series>(serieDoc)
  },
}

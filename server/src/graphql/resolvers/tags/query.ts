import { TagModel } from '../../../models/index.js'
import { toObjectMapping } from '../../../utils/mappers.js'
import { type QueryResolvers, type Tags } from '../../generated/types.js'

export const TagsQuery: QueryResolvers = {
  getAllTags: async () => {
    const tagsDocs = await TagModel.find({}).sort({ tag: 1 })
    return toObjectMapping<Tags>(tagsDocs)
  },
}

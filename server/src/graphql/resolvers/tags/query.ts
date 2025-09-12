import { TagModel } from '../../../models/index.js'
import { type Tags, type QueryResolvers } from '../../generated/types.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMapping, toObjectMappingSingle } from '../../../utils/mappers.js'

export const TagsQuery: QueryResolvers = {
  getTagById: async (_, args) => {
    const { id } = args
    if (!id) throw new HttpError('ID is required', 400)
    const tagDoc = await TagModel.findById(id)
    if (!tagDoc) throw new HttpError('Tag wasn`t found', 404)
    return toObjectMappingSingle<Tags>(tagDoc)
  },

  getAllTags: async () => {
    const tagsDocs = await TagModel.find({}).sort({ tag: 1 })
    return toObjectMapping<Tags>(tagsDocs)
  },
}

import { AuthorModel } from '../../../models/index.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Author, type MutationResolvers } from '../../generated/types.js'

export const AuthorMutation: MutationResolvers = {
  createAuthor: async (_, { input }) => {
    const authorDoc = await AuthorModel.create(input)
    return toObjectMappingSingle<Author>(authorDoc)
  },
}

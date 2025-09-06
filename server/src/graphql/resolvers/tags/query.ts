import { TagModel } from '#models/index.js'
import { type QueryResolvers } from '#graphql/generated/types.js'

export const TagsQuery: QueryResolvers = {
  getTagById: async (_, args) => {
    try {
      const { id } = args
      const tag = await TagModel.findById(id)
      return tag
    } catch (error: any) {
      throw new Error(`Couldn't get tag info with ID ${args.id}:`, error.message)
    }
  },

  getAllTags: async () => {
    try {
      const tags = await TagModel.find({}).sort({ tag: 1 })
      return tags
    } catch (error: any) {
      throw new Error('Couldn`t get tags', error.message)
    }
  },
}

import { type TagsResolvers } from '#graphql/generated/types.js'

export const TagsResolver: TagsResolvers = {
  booksInTag: async (tag, args, { dataloaders }) => {
    const { sortBy = 'title' } = args

    if (sortBy === 'title') {
      const books = await dataloaders.tags.booksInTag.load(tag._id)
      return books
    }
    if (sortBy === 'author') {
      const books = await dataloaders.tags.booksInTagByAuthor.load(tag._id)
      return books
    }
  },
}

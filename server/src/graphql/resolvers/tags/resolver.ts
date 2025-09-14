import { mergeResolvers } from '@graphql-tools/merge'

import { TagsMutation } from './mutation.js'
import { TagsQuery } from './query.js'
import { TagsResolver } from './resolver-from-data_loader.js'

export const tagResolvers = mergeResolvers([
  { Query: TagsQuery },
  { Mutation: TagsMutation },
  { Tags: TagsResolver },
])

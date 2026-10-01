import { mergeResolvers } from '@graphql-tools/merge'

import { TagsMutation } from './mutation.js'
import { TagsQuery } from './query.js'

export const tagResolvers = mergeResolvers([{ Query: TagsQuery }, { Mutation: TagsMutation }])

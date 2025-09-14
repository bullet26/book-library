import { mergeResolvers } from '@graphql-tools/merge'

import { AuthorMutation } from './mutation.js'
import { AuthorQuery } from './query.js'
import { AuthorResolver } from './resolver-from-data_loader.js'

export const authorResolvers = mergeResolvers([
  { Query: AuthorQuery },
  { Mutation: AuthorMutation },
  { Author: AuthorResolver },
])

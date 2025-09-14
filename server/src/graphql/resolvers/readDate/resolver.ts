import { mergeResolvers } from '@graphql-tools/merge'

import { ReadDateMutation } from './mutation.js'
import { ReadDateQuery } from './query.js'
import { ReadDateResolver } from './resolver-from-data_loader.js'

export const readDateResolvers = mergeResolvers([
  { Query: ReadDateQuery },
  { Mutation: ReadDateMutation },
  { ReadDate: ReadDateResolver },
])

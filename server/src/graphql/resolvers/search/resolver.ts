import { mergeResolvers } from '@graphql-tools/merge'

import { SearchQuery } from './query.js'
import { SearchResolver } from './resolver-union-type.js'

export const searchResolvers = mergeResolvers([
  { Query: SearchQuery },
  { SearchResult: SearchResolver },
])

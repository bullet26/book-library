import { mergeResolvers } from '@graphql-tools/merge'

import { SeriesMutation } from './mutation.js'
import { SeriesResolver } from './resolver-from-data_loader.js'

export const seriesResolvers = mergeResolvers([
  { Mutation: SeriesMutation },
  { Series: SeriesResolver },
])

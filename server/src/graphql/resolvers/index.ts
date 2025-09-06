import { mergeResolvers } from '@graphql-tools/merge'
import { type IResolvers } from '@graphql-tools/utils'
import { Resolvers } from '#graphql/generated/types.js'
import { dateScalar } from '#graphql/scalar/Date.js'
import { additionalMediaResolvers } from './additionalMedia/index.js'
import { authorResolvers } from './author/index.js'
import { bookResolvers } from './book/index.js'
import { descriptionPlotResolvers } from './descriptionPlot/index.js'
import { readDateResolvers } from './readDate/index.js'
import { searchResolvers } from './search/index.js'
import { seriesResolvers } from './series/index.js'
import { tagResolvers } from './tags/index.js'
import { analyticsResolvers } from './analytics/index.js'

export const resolvers: Resolvers = mergeResolvers([
  { Date: dateScalar },
  analyticsResolvers,
  additionalMediaResolvers,
  authorResolvers,
  bookResolvers,
  descriptionPlotResolvers,
  readDateResolvers,
  searchResolvers,
  seriesResolvers,
  tagResolvers,
] as IResolvers<any, any>[])

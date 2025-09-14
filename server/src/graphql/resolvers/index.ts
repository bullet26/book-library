import { mergeResolvers } from '@graphql-tools/merge'
import { type IResolvers } from '@graphql-tools/utils'
import { Resolvers } from '../generated/types.js'

import { dateScalar } from '../scalar/Date.js'
import { additionalMediaResolvers } from './additionalMedia/resolver.js'
import { analyticsResolvers } from './analytics/resolver.js'
import { authorResolvers } from './author/resolver.js'
import { bookResolvers } from './book/resolver.js'
import { descriptionPlotResolvers } from './descriptionPlot/resolver.js'
import { readDateResolvers } from './readDate/resolver.js'
import { searchResolvers } from './search/resolver.js'
import { seriesResolvers } from './series/resolver.js'
import { tagResolvers } from './tags/resolver.js'

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
] as IResolvers[])

import { mergeResolvers } from '@graphql-tools/merge'
import { type IResolvers } from '@graphql-tools/utils'
import { Resolvers } from '../generated/types.js'
import { loadFiles } from '@graphql-tools/load-files'
import path from 'path'
import { fileURLToPath } from 'url'

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

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const resolversPath = path.join(__dirname, '**/resolver.js')

// const resolversArray: IResolvers[] = await loadFiles(resolversPath, {
//   recursive: true,
//   ignoreIndex: true,
// })

// export const resolvers: Resolvers = mergeResolvers(resolversArray)

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

import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const typeDefs = await loadSchema(path.join(__dirname, '*.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { APP_MODE } from '../../config/index.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const schemaPath =
  APP_MODE === 'vercel'
    ? path.join(process.cwd(), '**/*.graphql')
    : path.join(__dirname, '*.graphql')

export const typeDefs = await loadSchema(schemaPath, {
  loaders: [new GraphQLFileLoader()],
})

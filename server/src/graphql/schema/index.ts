import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const typesArray = await loadFiles(path.join(__dirname, '*.graphql'), {
  extensions: ['graphql'],
  ignoreIndex: true,
})

export const typeDefs = mergeTypeDefs(typesArray)

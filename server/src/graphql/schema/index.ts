import path from 'path'
import { fileURLToPath } from 'url'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.debug('__dirname', __dirname)

const typesArray = loadFilesSync(path.join(__dirname, './*.graphql'))

export const typeDefs = mergeTypeDefs(typesArray)

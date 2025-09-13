import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log('__dirname', __dirname)

const typesArray = loadFilesSync(path.join(__dirname, './*.graphql'))

export const typeDefs = mergeTypeDefs(typesArray)

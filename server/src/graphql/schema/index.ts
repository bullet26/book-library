import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import { fileURLToPath } from 'url'
import { consoleInfo } from '../../common/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
consoleInfo(`__dirname ${__dirname}`)

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'), { ignoreIndex: true })

export const typeDefs = mergeTypeDefs(typesArray)

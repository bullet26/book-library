import { loadFiles } from '@graphql-tools/load-files'
import { loadSchema } from '@graphql-tools/load'

import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { consoleInfo } from '../../common/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// const typesArray = await loadFiles(path.join(__dirname, '*.graphql'), {
//   ignoreIndex: true,
//   extensions: ['graphql'],
//   requireMethod: (path: any) => fs.readFileSync(path, 'utf-8'),
// })

// export const typeDefs = mergeTypeDefs(typesArray)

export const typeDefs = await loadSchema(path.join(__dirname, '*.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

consoleInfo(`${__dirname} __dirname`)

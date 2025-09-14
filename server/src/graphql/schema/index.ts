import { loadFiles } from '@graphql-tools/load-files'
import { loadSchema } from '@graphql-tools/load'

import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

// const typesArray = await loadFiles(path.join(__dirname, '*.graphql'), {
//   ignoreIndex: true,
//   extensions: ['graphql'],
//   requireMethod: (path: any) => fs.readFileSync(path, 'utf-8'),
// })

// export const typeDefs = mergeTypeDefs(typesArray)

export const typeDefs = await loadSchema(path.join(process.cwd(), 'graphql/schema/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.{ts,tsx}'], // gql-запросы
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/__graphql/__generated__/': {
      preset: 'client',
    },
    './src/__graphql/__generated__/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
        useTypeImports: true,
      },
    },
  },
}

export default config

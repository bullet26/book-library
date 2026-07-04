import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.{ts,tsx}'], // gql-запросы
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/__graphql/__generated__/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: {
          Date: {
            input: 'string',
            output: '{ day: number; month: string; year: number }',
          },
        },
      },
    },
    './src/__graphql/__generated__/enums.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: false,
        onlyEnums: true,
      },
    },
    './src/__graphql/__generated__/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

export default config

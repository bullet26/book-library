import { type SearchResultResolvers } from '#graphql/generated/types.js'

const SearchResult = {
  __resolveType(obj: any) {
    if (obj.surname || obj.name) {
      return 'Author'
    }

    if (obj.title) {
      return 'Book'
    }
    return null // GraphQLError is thrown
  },
}

export const SearchResolver: SearchResultResolvers = { ...SearchResult }

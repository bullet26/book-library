import type {
  GetAllBooksBySpecificDateQuery,
  GetOneAuthorByIdQuery,
} from '__graphql/__generated__/graphql'

export type ReadDateBook = NonNullable<GetAllBooksBySpecificDateQuery['bookInYear']>[number]

export type SerieBooks = NonNullable<GetOneAuthorByIdQuery['author']>['series'][0]

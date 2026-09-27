import type {
  GetAllBooksBySpecificDateQuery,
  GetOneAuthorByIdQuery,
} from '__graphql/__generated__/graphql'

export type BooksBySpecificDate = NonNullable<GetAllBooksBySpecificDateQuery['bookInYear']>[number]

export type SerieBooks = NonNullable<GetOneAuthorByIdQuery['author']>['series'][number]

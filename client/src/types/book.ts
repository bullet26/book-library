import type {
  GetAllBooksByDateQuery,
  GetAllBooksBySpecificDateQuery,
  GetBooksByTagQuery,
  GetOneAuthorByIdQuery,
} from '__graphql/__generated__/graphql'

export type BooksBySpecificDate = NonNullable<GetAllBooksBySpecificDateQuery['bookInYear']>[number]
export type BooksByDate = NonNullable<GetAllBooksByDateQuery['getAllBooksByDate']>['readDate']

export type BooksByTag = NonNullable<GetBooksByTagQuery['tagData']>['booksInTag']

export type SerieBooks = NonNullable<GetOneAuthorByIdQuery['author']>['series'][number]

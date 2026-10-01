import type { GetBooksQuery, GetOneAuthorByIdQuery } from '__graphql/__generated__/graphql'

export type AllBooks = NonNullable<GetBooksQuery['getBooks']>['books']

export type SerieBooks = NonNullable<GetOneAuthorByIdQuery['author']>['series'][number]

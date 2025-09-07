import type { GetAllBooksBySpecificDateQuery } from '__graphql/__generated__/graphql'

export type ReadDateBook = NonNullable<GetAllBooksBySpecificDateQuery['bookInYear']>[number]

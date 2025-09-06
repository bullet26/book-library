import { type ReadDateResolvers } from '#graphql/generated/types.js'

export const ReadDateResolver: ReadDateResolvers = {
  books: (readDate, _, { dataloaders }) => dataloaders.readDate.books.load(readDate.bookID),
}

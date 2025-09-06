import { type AuthorResolvers } from '#graphql/generated/types.js'

export const AuthorResolver: AuthorResolvers = {
  books: (author, _, { dataloaders }) => dataloaders.author.books.load(author._id),
  series: (author, _, { dataloaders }) => dataloaders.author.series.load(author._id),
  booksWithoutSeries: (author, _, { dataloaders }) =>
    dataloaders.author.booksWithoutSeries.load(author._id),
}

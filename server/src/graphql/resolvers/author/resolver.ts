import { type AuthorResolvers } from '../../generated/types.js'

export const AuthorResolver: AuthorResolvers = {
  books: (author, _, { dataloaders }) => dataloaders.author.books.load(author.id),
  series: (author, _, { dataloaders }) => dataloaders.author.series.load(author.id),
  booksWithoutSeries: (author, _, { dataloaders }) =>
    dataloaders.author.booksWithoutSeries.load(author.id),
}

import { type BookResolvers } from '#graphql/generated/types.js'

export const BookResolver: BookResolvers = {
  author: (book, _, { dataloaders }) => dataloaders.book.author.load(book.authorID),
  series: (book, _, { dataloaders }) =>
    book.seriesID ? dataloaders.book.series.load(book.seriesID) : null,
  tags: (book, _, { dataloaders }) => dataloaders.book.tags.load(book._id),
  readDate: (book, _, { dataloaders }) => dataloaders.book.readDate.load(book._id),
  isAdditionalMediaExist: (book, _, { dataloaders }) =>
    dataloaders.book.isAdditionalMediaExist.load(book._id),
  additionalMedia: (book, _, { dataloaders }) => dataloaders.book.additionalMedia.load(book._id),
}

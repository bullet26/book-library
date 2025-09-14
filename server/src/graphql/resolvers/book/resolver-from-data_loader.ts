import { type BookResolvers } from '../../generated/types.js'

export const BookResolver: BookResolvers = {
  additionalMedia: (book, _, { dataloaders }) => dataloaders.book.additionalMedia.load(book.id),
  author: (book, _, { dataloaders }) => dataloaders.book.author.load(book.authorID),
  isAdditionalMediaExist: (book, _, { dataloaders }) =>
    dataloaders.book.isAdditionalMediaExist.load(book.id),
  readDate: (book, _, { dataloaders }) => dataloaders.book.readDate.load(book.id),
  series: (book, _, { dataloaders }) =>
    book.seriesID ? dataloaders.book.series.load(book.seriesID) : null,
  tags: (book, _, { dataloaders }) => dataloaders.book.tags.load(book.id),
}

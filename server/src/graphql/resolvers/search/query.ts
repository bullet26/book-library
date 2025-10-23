import { AuthorModel, BooksModel, SeriesModel } from '../../../models/index.js'
import { toObjectMapping } from '../../../utils/mappers.js'
import { type Author, type Book, type QueryResolvers, type Series } from '../../generated/types.js'

const searchInBooks = async (searchString: string) => {
  const regexp = new RegExp(searchString, 'i')

  const booksDocs = await BooksModel.find({ title: regexp }).limit(15)
  return toObjectMapping<Book>(booksDocs)
}

const searchInAuthors = async (searchString: string) => {
  const searchSplitted = searchString.split(/\s+/)

  const regexpS = searchSplitted.map((part) => new RegExp(part, 'i'))

  const authorsDocs = await AuthorModel.find({
    $or: [
      { surname: { $in: regexpS } },
      { name: { $in: regexpS } },
      { transcriptionName: { $in: regexpS } },
    ],
  }).limit(15)

  return toObjectMapping<Author>(authorsDocs)
}

export const SearchQuery: QueryResolvers = {
  search: async (_, { searchString }) => {
    const books = await searchInBooks(searchString)
    const authors = await searchInAuthors(searchString)
    return [...books, ...authors]
  },

  searchInSeries: async (_, { searchString }) => {
    const regexp = new RegExp(searchString, 'i')

    const seriesDocs = await SeriesModel.find({ title: regexp }).limit(15)
    return toObjectMapping<Series>(seriesDocs)
  },

  searchInBooks: async (_, { searchString }) => searchInBooks(searchString),
  searchInAuthors: async (_, { searchString }) => searchInAuthors(searchString),
}

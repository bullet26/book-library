import { AuthorModel, BooksModel, SeriesModel } from '../../../models/index.js'
import { toObjectMapping } from '../../../utils/mappers.js'
import { type Author, type Book, type QueryResolvers, type Series } from '../../generated/types.js'

export const SearchQuery: QueryResolvers = {
  search: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const booksDocs = await BooksModel.find({ title: regexp }).limit(15)
    const authorsDocs = await AuthorModel.find({
      $or: [{ surname: regexp }, { name: regexp }, { transcriptionName: regexp }],
    }).limit(15)

    const books = toObjectMapping<Book>(booksDocs)
    const authors = toObjectMapping<Author>(authorsDocs)

    return [...books, ...authors]
  },

  searchInAuthors: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const authorsDocs = await AuthorModel.find({
      $or: [{ surname: regexp }, { name: regexp }, { transcriptionName: regexp }],
    }).limit(15)

    return toObjectMapping<Author>(authorsDocs)
  },

  searchInBooks: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const booksDocs = await BooksModel.find({ title: regexp }).limit(15)
    return toObjectMapping<Book>(booksDocs)
  },

  searchInSeries: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const seriesDocs = await SeriesModel.find({ title: regexp }).limit(15)
    return toObjectMapping<Series>(seriesDocs)
  },
}

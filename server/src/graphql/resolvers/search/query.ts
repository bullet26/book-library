import { AuthorModel, BooksModel, SeriesModel } from '#models/index.js'
import {
  type Book,
  type Author,
  type QueryResolvers,
  type Series,
} from '#graphql/generated/types.js'
import { toObjectMapping } from '#utils/mappers.js'

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

  searchInSeries: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const seriesDocs = await SeriesModel.find({ title: regexp }).limit(15)
    return toObjectMapping<Series>(seriesDocs)
  },

  searchInBooks: async (_, args) => {
    const { searchString } = args
    const regexp = new RegExp(searchString, 'i')

    const booksDocs = await BooksModel.find({ title: regexp }).limit(15)
    return toObjectMapping<Book>(booksDocs)
  },
}

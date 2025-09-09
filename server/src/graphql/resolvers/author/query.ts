import {
  type AuthorMostReadResponse,
  type Author,
  type QueryResolvers,
} from '#graphql/generated/types.js'
import { AuthorModel, BooksModel } from '#models/index.js'
import { HttpError } from '#utils/http-error.js'
import { toObjectMapping, toObjectMappingSingle } from '#utils/mappers.js'
import { authorsAggregation } from './aggregation.js'

export const AuthorQuery: QueryResolvers = {
  getAllAuthors: async (_, args) => {
    const { page, limit } = args

    const totalCount = await AuthorModel.countDocuments({})
    const authorsDocs = await AuthorModel.find({})
      .sort({ surname: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const authors = toObjectMapping<Author>(authorsDocs)
    return { authors, totalCount }
  },

  getAllAuthorsByBooksCount: async () => {
    const authors = await BooksModel.aggregate(authorsAggregation)
    return authors
  },

  getOneAuthor: async (_, args) => {
    const { id } = args
    if (!id) throw new HttpError('ID is required', 400)

    const authorDoc = await AuthorModel.findById(id)
    if (!authorDoc) throw new HttpError('Author wasn`t found', 404)

    const author = toObjectMappingSingle<Author>(authorDoc)
    return author
  },
}

import mongoose from 'mongoose'
import { BooksModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type QueryResolvers } from '../../generated/types.js'
import { generateFilterPipeline, generateSortStage } from './aggregation.js'

interface BooksAggregateResult {
  books: (Book & { _id: mongoose.Types.ObjectId })[]
  totalCount: { count: number }[]
}

export const BookQuery: QueryResolvers = {
  getBooks: async (_, args) => {
    const { filter, sort, page, limit } = args

    const sortStage = generateSortStage(sort)
    const pipeline = generateFilterPipeline(sort, filter)

    const [result] = await BooksModel.aggregate<BooksAggregateResult>([
      ...pipeline,
      {
        $facet: {
          books: [{ $sort: sortStage }, { $skip: (page - 1) * limit }, { $limit: limit }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ])

    const totalCount = result.totalCount[0]?.count || 0

    const booksDocs = result.books

    const books: Book[] = booksDocs.map((doc) => ({
      ...doc,
      id: doc._id.toString(),
    }))

    return { books, totalCount }
  },

  getOneBook: async (_, args) => {
    const { id } = args
    if (!id) throw new HttpError('ID is required', 400)

    const bookDoc = await BooksModel.findById(id)
    if (!bookDoc) throw new HttpError('Book wasn`t found', 404)

    const book = toObjectMappingSingle<Book>(bookDoc)
    return book
  },
}

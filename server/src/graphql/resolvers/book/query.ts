import mongoose from 'mongoose'
import { BooksModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMappingSingle } from '../../../utils/mappers.js'
import { BookSortBy, type Book, type QueryResolvers } from '../../generated/types.js'

interface BooksAggregateResult {
  books: (Book & { _id: mongoose.Types.ObjectId })[]
  totalCount: { count: number }[]
}

export const BookQuery: QueryResolvers = {
  getBooks: async (_, args) => {
    const { filter, sort = 'DATE_DESC', page = 1, limit = 20 } = args
    const tagID = filter?.tagId
    const rating = filter?.rating
    const year = filter?.year

    const pipeline: any[] = []

    if (rating) {
      pipeline.push({ $match: { rating } })
    }

    const isDateSort = sort === BookSortBy.DateDesc || sort === BookSortBy.DateAsc
    const isAuthorSort = sort === BookSortBy.AuthorAsc || sort === BookSortBy.AuthorDesc

    if (year || isDateSort) {
      pipeline.push({
        $lookup: {
          from: 'readDate',
          localField: '_id',
          foreignField: 'bookID',
          as: 'readDates',
        },
      })
      pipeline.push({
        $unwind: {
          path: '$readDates',
          preserveNullAndEmptyArrays: true, // unwind keeps documents where the specified field is missing, null, or an empty array in the output pipeline.
        },
      })
    }

    if (isAuthorSort) {
      pipeline.push({
        $lookup: {
          from: 'authors',
          localField: 'authorID',
          foreignField: '_id',
          as: 'authorData',
        },
      })
      pipeline.push({
        $unwind: {
          path: '$authorData',
          preserveNullAndEmptyArrays: true,
        },
      })
    }

    if (year && typeof year === 'number') {
      const startDate = new Date(`${year.toString()}-01-01`)
      const endDate = new Date(`${(year + 1).toString()}-01-01`)
      pipeline.push({
        $match: {
          'readDates.readEnd': { $gte: startDate, $lt: endDate },
        },
      })
    }

    if (tagID && typeof tagID === 'string') {
      pipeline.push({
        $lookup: {
          from: 'BookTagRelations',
          localField: '_id',
          foreignField: 'bookID',
          as: 'tagRelations',
        },
      })
      pipeline.push({
        $match: {
          'tagRelations.tagID': new mongoose.Types.ObjectId(tagID),
        },
      })
    }

    const sortStage: Record<string, 1 | -1> = {}

    switch (sort) {
      case BookSortBy.DateDesc:
        sortStage['readDates.readEnd'] = -1
        sortStage.title = 1
        break

      case BookSortBy.DateAsc:
        sortStage['readDates.readEnd'] = 1
        sortStage.title = 1
        break

      case BookSortBy.RatingDesc:
        sortStage.rating = -1
        sortStage.title = 1
        break

      case BookSortBy.RatingAsc:
        sortStage.rating = 1
        sortStage.title = 1
        break

      case BookSortBy.AuthorAsc:
        sortStage['authorData.surname'] = 1
        sortStage.title = 1
        break

      case BookSortBy.AuthorDesc:
        sortStage['authorData.surname'] = -1
        sortStage.title = 1
        break

      case BookSortBy.TitleDesc:
        sortStage.title = -1
        break

      case BookSortBy.TitleAsc:
      default:
        sortStage.title = 1
        break
    }

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

import { BooksModel, ReadDateModel } from '../../../models/index.js'
import { type QueryResolvers } from '../../generated/types.js'
import {
  authorsAggregation,
  booksAggregation,
  yearsAggregate,
  yearsStatisticAggregate,
} from './aggregation.js'

export const AnalyticsQuery: QueryResolvers = {
  getMostReadAuthors: async () => {
    const authorsStat = await BooksModel.aggregate(authorsAggregation)
    return authorsStat
  },

  getMostReadBooks: async () => {
    const booksStat = await ReadDateModel.aggregate(booksAggregation)
    return booksStat
  },

  getReadStatistic: async (_, args) => {
    const { label, year } = args

    if (label === 'all') {
      const booksStat = await ReadDateModel.aggregate(yearsStatisticAggregate)
      return booksStat
    }
    if (label === 'year' && !!year) {
      const booksStat = await ReadDateModel.aggregate(yearsAggregate(year))
      return booksStat
    }
    return []
  },
}

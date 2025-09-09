import { type QueryResolvers } from '#graphql/generated/types.js'
import { BooksModel, ReadDateModel } from '#models/index.js'
import {
  booksAggregation,
  authorsAggregation,
  yearsStatisticAggregate,
  yearsAggregate,
} from './aggregation.js'

export const AnalyticsQuery: QueryResolvers = {
  getMostReadBooks: async () => {
    const booksStat = await ReadDateModel.aggregate(booksAggregation)
    return booksStat
  },

  getMostReadAuthors: async () => {
    const authorsStat = await BooksModel.aggregate(authorsAggregation)
    return authorsStat
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

import {
  type Statistic,
  type AuthorsStatisticResponse,
  type BooksStatisticResponse,
  type QueryResolvers,
} from '#graphql/generated/types.js'
import { BooksModel, ReadDateModel } from '#models/index.js'
import { toObjectMapping } from '#utils/mappers.js'
import {
  booksAggregation,
  authorsAggregation,
  yearsStatisticAggregate,
  yearsAggregate,
} from './aggregation.js'

export const AnalyticsQuery: QueryResolvers = {
  getMostReadBooks: async () => {
    const booksDocs = await ReadDateModel.aggregate(booksAggregation)
    return toObjectMapping<BooksStatisticResponse>(booksDocs)
  },

  getMostReadAuthors: async () => {
    const authorsDocs = await BooksModel.aggregate(authorsAggregation)
    return toObjectMapping<AuthorsStatisticResponse>(authorsDocs)
  },

  getReadStatistic: async (_, args) => {
    const { label, year } = args

    if (label === 'all') {
      const booksDocs = await ReadDateModel.aggregate(yearsStatisticAggregate)
      return toObjectMapping<Statistic>(booksDocs)
    }
    if (label === 'year' && !!year) {
      const booksDocs = await ReadDateModel.aggregate(yearsAggregate(year))
      return toObjectMapping<Statistic>(booksDocs)
    }
    return []
  },
}

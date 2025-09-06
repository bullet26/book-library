import { ReadDateModel } from '#models/index.js'
import { type ReadDate, type QueryResolvers } from '#graphql/generated/types.js'
import { toObjectMapping } from '#utils/mappers.js'

export const ReadDateQuery: QueryResolvers = {
  getAllBooksByDate: async (_, args) => {
    const { page, limit } = args

    const totalCount = await ReadDateModel.countDocuments({})
    const booksDocs = await ReadDateModel.find({})
      .sort({ readEnd: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const books = toObjectMapping<ReadDate>(booksDocs)

    return { totalCount, readDate: books }
  },

  getAllBooksBySpecificDate: async (_, args) => {
    const { year } = args

    const booksDocs = await ReadDateModel.find({
      readEnd: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    }).sort({ readEnd: 1 })

    return toObjectMapping<ReadDate>(booksDocs)
  },
}

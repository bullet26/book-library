import { ReadDateModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMapping } from '../../../utils/mappers.js'
import { type QueryResolvers, type ReadDate } from '../../generated/types.js'

export const ReadDateQuery: QueryResolvers = {
  getAllBooksByDate: async (_, args) => {
    const { limit, page } = args

    const totalCount = await ReadDateModel.countDocuments({})
    const booksDocs = await ReadDateModel.find({})
      .sort({ readEnd: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const books = toObjectMapping<ReadDate>(booksDocs)

    return { readDate: books, totalCount }
  },

  getAllBooksBySpecificDate: async (_, args) => {
    const { year } = args
    if (!year) throw new HttpError('year is required', 400)

    const booksDocs = await ReadDateModel.find({
      readEnd: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    }).sort({ readEnd: 1 })

    return toObjectMapping<ReadDate>(booksDocs)
  },
}

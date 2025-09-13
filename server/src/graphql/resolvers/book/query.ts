import { BooksModel } from '../../../models/index.js'
import { HttpError } from '../../../utils/http-error.js'
import { toObjectMapping, toObjectMappingSingle } from '../../../utils/mappers.js'
import { type Book, type QueryResolvers } from '../../generated/types.js'

export const BookQuery: QueryResolvers = {
  getAllBooksByName: async (_, args) => {
    const { limit, page } = args

    const totalCount = await BooksModel.countDocuments({})
    const booksDocs = await BooksModel.find({})
      .sort({ title: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const books = toObjectMapping<Book>(booksDocs)

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

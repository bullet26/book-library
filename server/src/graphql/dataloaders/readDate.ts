import DataLoader from 'dataloader'

import { BooksModel } from '../../models/index.js'
import { mapOneToOne, toObjectMapping } from '../../utils/mappers.js'
import { Book } from '../generated/types.js'

export const ReadDateDL = {
  books: new DataLoader(async (bookIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({ _id: { $in: bookIDs } })
    const books = toObjectMapping<Book>(booksDocs)

    return mapOneToOne(books, bookIDs)
  }),
}

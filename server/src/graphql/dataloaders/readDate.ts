import DataLoader from 'dataloader'
import { BooksModel } from '#models/index.js'
import { toObjectMapping } from '#utils/mappers.js'
import { Book } from '#graphql/generated/types.js'

export const ReadDateDL = {
  books: new DataLoader(async (bookIDs: readonly string[]) => {
    const booksDocs = await BooksModel.find({ _id: { $in: bookIDs } })
    const books = toObjectMapping<Book>(booksDocs)

    return bookIDs.map((id) => books.find((item) => item.id === id.toString()))
  }),
}

import DataLoader from 'dataloader'
import { AuthorDL } from './author.js'
import { BookDL } from './book.js'
import { ReadDateDL } from './readDate.js'
import { SeriesDL } from './series.js'
import { TagsDL } from './tags.js'
import { Author, Book, ReadDate, Series, Tags } from '#graphql/generated/types.js'

type DataLoaderItem<T> = DataLoader<string, T[]>

export interface DataLoadersType {
  dataloaders: {
    author: {
      books: DataLoaderItem<Book>
      series: DataLoaderItem<Series>
      booksWithoutSeries: DataLoaderItem<Book>
    }
    book: {
      author: DataLoaderItem<Author>
      series: DataLoaderItem<Series>
      tags: DataLoaderItem<Tags>
      readDate: DataLoaderItem<ReadDate>
      isAdditionalMediaExist: DataLoaderItem<boolean>
      additionalMedia: DataLoaderItem<any>
    }
    readDate: { books: DataLoaderItem<Book> }
    series: { booksInSeries: DataLoaderItem<Book> }
    tags: { booksInTag: DataLoaderItem<Book>; booksInTagByAuthor: DataLoaderItem<Book> }
  }
}

export const createContext = async (): Promise<DataLoadersType> => ({
  dataloaders: {
    author: AuthorDL,
    book: BookDL,
    readDate: ReadDateDL,
    series: SeriesDL,
    tags: TagsDL,
  },
})

import DataLoader from 'dataloader'
import { AuthorDL } from './author.js'
import { BookDL } from './book.js'
import { ReadDateDL } from './readDate.js'
import { SeriesDL } from './series.js'
import { TagsDL } from './tags.js'
import {
  type Author,
  type Book,
  type ReadDate,
  type Series,
  type Tags,
} from '#graphql/generated/types.js'

type DataLoaderItemMany<T> = DataLoader<string, T[]>
type DataLoaderItemOne<T> = DataLoader<string, T | undefined>

export interface DataLoadersType {
  dataloaders: {
    author: {
      books: DataLoaderItemMany<Book>
      series: DataLoaderItemMany<Series>
      booksWithoutSeries: DataLoaderItemMany<Book>
    }
    book: {
      author: DataLoaderItemOne<Author>
      series: DataLoaderItemOne<Series>
      tags: DataLoaderItemMany<Tags>
      readDate: DataLoaderItemMany<ReadDate>
      isAdditionalMediaExist: DataLoaderItemOne<Book['isAdditionalMediaExist']>
      additionalMedia: DataLoaderItemOne<{}>
    }
    readDate: { books: DataLoaderItemOne<Book> }
    series: { booksInSeries: DataLoaderItemMany<Book> }
    tags: { booksInTag: DataLoaderItemMany<Book>; booksInTagByAuthor: DataLoaderItemMany<Book> }
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

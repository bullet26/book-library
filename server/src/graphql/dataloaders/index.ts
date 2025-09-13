import DataLoader from 'dataloader'

import {
  type Author,
  type Book,
  type ReadDate,
  type Series,
  type Tags,
} from '../generated/types.js'
import { AuthorDL } from './author.js'
import { BookDL } from './book.js'
import { ReadDateDL } from './readDate.js'
import { SeriesDL } from './series.js'
import { TagsDL } from './tags.js'

export interface DataLoadersType {
  dataloaders: {
    author: {
      books: DataLoaderItemMany<Book>
      booksWithoutSeries: DataLoaderItemMany<Book>
      series: DataLoaderItemMany<Series>
    }
    book: {
      additionalMedia: DataLoaderItemOne<{}>
      author: DataLoaderItemOne<Author>
      isAdditionalMediaExist: DataLoaderItemOne<Book['isAdditionalMediaExist']>
      readDate: DataLoaderItemMany<ReadDate>
      series: DataLoaderItemOne<Series>
      tags: DataLoaderItemMany<Tags>
    }
    readDate: { books: DataLoaderItemOne<Book> }
    series: { booksInSeries: DataLoaderItemMany<Book> }
    tags: { booksInTag: DataLoaderItemMany<Book>; booksInTagByAuthor: DataLoaderItemMany<Book> }
  }
}
type DataLoaderItemMany<T> = DataLoader<string, T[]>

type DataLoaderItemOne<T> = DataLoader<string, T | undefined>

export const createContext = async (): Promise<DataLoadersType> => ({
  dataloaders: {
    author: AuthorDL,
    book: BookDL,
    readDate: ReadDateDL,
    series: SeriesDL,
    tags: TagsDL,
  },
})

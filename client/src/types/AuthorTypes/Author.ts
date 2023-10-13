import { Book, Series } from 'types'

export interface Author {
  id?: string
  name: string
  surname: string
  portrait: string
  books: Book[]
  series: [Series]
  booksWithoutSeries: [Book]
}

export interface AuthorInput {
  name: string
  surname: string
  portrait: string | null
  transcriptionName: string | null
}

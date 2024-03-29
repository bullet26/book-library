import { Book } from 'types'

export interface ReadDateBook {
  id?: string
  bookID?: string
  books: Book
  readEnd: {
    year: string
    month: string
    day: string
  }
}

export interface ReadDateInput {
  bookID: string
  readEnd: string
}

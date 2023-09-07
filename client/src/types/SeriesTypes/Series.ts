import { Book } from 'types'

export interface Series {
  id?: string
  authorID?: string
  title: string
  booksInSeries: Book[]
}

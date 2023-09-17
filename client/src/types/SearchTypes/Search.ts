import { Book, Author } from 'types'

export type Search = Book | Author

export interface IStatistic {
  period: string
  count: number
}

import { Author, ReadDateBook, Series } from 'types'

export interface Book {
  id: string
  authorID?: string
  author: Author
  title: string
  rating: number
  seriesID?: string
  series?: Series
  seriesNumber?: number
  pages: number
  notes?: string
  description?: string
  readDate?: ReadDateBook[]
  bookCover: string
}

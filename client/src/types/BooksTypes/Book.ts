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

export interface BookInput {
  authorID: string | null
  title: string
  rating: number | null
  seriesID: string | null
  seriesNumber: number | null
  pages: number | null
  notes: string | null
  description: string
  readEnd: string
  plot: string | null
  bookCover: string | null
}

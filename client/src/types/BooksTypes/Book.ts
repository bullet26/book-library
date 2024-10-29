// eslint-disable-next-line import/no-extraneous-dependencies
import { Dayjs } from 'dayjs'
import { Author, ReadDateBook, Series, AllMediaForItem } from 'types'

export interface Book {
  id: string
  authorID?: string
  author: Author
  title: string
  rating: number
  seriesID?: string
  series?: Series
  seriesNumber?: number
  tags: Tag[]
  pages: number
  notes?: string
  description?: string
  readDate?: ReadDateBook[]
  bookCover: string
  bookCoverThumbnail: string
  isAdditionalMediaExist: boolean
  additionalMedia: AllMediaForItem
}

export interface Tag {
  id: string
  tag: string
  booksInTag: Book[]
}

export interface BookInput {
  authorID: string | null
  title: string
  rating: number | null
  seriesID: string | null
  seriesNumber: number | null
  pages: number | null
  notes: string | null
  description: string | null
  readEnd: string
  plot: string | null
  bookCover: string | null
}

export interface BookInputFormValues extends Omit<BookInput, 'readEnd'> {
  author: string
  series: string
  readEnd: Dayjs
}

export { client } from './client'
export {
  ALL_BOOKS_BY_DATE,
  ONE_BOOK_BY_ID,
  ONE_BOOK_PLOT,
  ALL_BOOKS_BY_SPECIFIC_DATE,
  ALL_BOOKS_BY_TAG,
  CREATE_BOOK,
  CREATE_READ_DATE,
  ALL_MEDIA_FOR_BOOK,
} from './books'
export { ALL_TAGS, CREATE_LINK_TAG_WITH_BOOK } from './tag'
export { ALL_AUTHORS, ONE_AUTHOR_BY_ID, CREATE_AUTHOR, ALL_AUTHORS_BY_BOOKS_COUNT } from './authors'
export {
  SEARCH_IN_BOOKS_AND_AUTHORS,
  SEARCH_IN_BOOKS,
  SEARCH_IN_AUTHORS,
  SEARCH_IN_SERIES,
} from './search'
export { MOST_READ_BOOKS, MOST_READ_AUTHORS, READ_STATISTIC } from './analytics'
export { ADD_MEDIA } from './media'
export { CREATE_SERIE } from './serie'

import { graphql } from './__generated__'

export const ALL_BOOKS_BY_DATE = graphql(`
  query GetAllBooksByDate($page: Int, $limit: Int) {
    getAllBooksByDate(page: $page, limit: $limit) {
      readDate {
        id
        books {
          id
          title
          rating
          bookCoverThumbnail
          author {
            surname
            name
          }
        }
      }
      totalCount
    }
  }
`)

export const ONE_BOOK_BY_ID = graphql(`
  query GetOneBookById($id: ID) {
    book: getOneBook(id: $id) {
      id
      author {
        surname
        name
        id
      }
      title
      rating
      series {
        title
        booksInSeries {
          id
          title
          rating
          bookCoverThumbnail
        }
      }
      description
      readDate {
        readEnd
      }
      tags {
        id
        tag
      }
      bookCover
      isAdditionalMediaExist
    }
  }
`)

export const ONE_BOOK_PLOT = graphql(`
  query GetOneBookPlot($bookID: ID) {
    book: getOneBookPlot(bookID: $bookID) {
      plot
    }
  }
`)

export const ALL_BOOKS_BY_SPECIFIC_DATE = graphql(`
  query GetAllBooksBySpecificDate($year: Int!) {
    bookInYear: getAllBooksBySpecificDate(year: $year) {
      books {
        id
        title
        bookCoverThumbnail
        rating
        author {
          surname
          name
        }
      }
      readEnd
      id
    }
  }
`)

export const ALL_BOOKS_BY_TAG = graphql(`
  query GetBooksByTag($id: ID, $sortBy: String) {
    tagData: getTagById(id: $id) {
      tag
      booksInTag(sortBy: $sortBy) {
        id
        title
        bookCoverThumbnail
        rating
        author {
          surname
          name
        }
      }
    }
  }
`)

export const CREATE_BOOK = graphql(`
  mutation CreteBook($input: BookInput!) {
    bookInfo: addBook(input: $input) {
      title
      author {
        name
        surname
      }
    }
  }
`)

export const CREATE_READ_DATE = graphql(`
  mutation CreateReadDate($input: ReadDateInput!) {
    bookInfo: addReadDate(input: $input) {
      readEnd
      books {
        title
      }
    }
  }
`)

export const ALL_MEDIA_FOR_BOOK = graphql(`
  query GetMediaForBook($id: ID) {
    book: getOneBook(id: $id) {
      id
      title
      media: additionalMedia {
        video {
          id
          type
          url
        }
        image {
          id
          url
          type
        }
      }
    }
  }
`)

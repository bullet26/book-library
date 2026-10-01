import { graphql } from './__generated__'

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
      notes
    }
  }
`)

export const ONE_BOOK_PLOT = graphql(`
  query GetOneBookPlot($bookID: ID) {
    book: getOneBookPlot(bookID: $bookID) {
      id
      plot
    }
  }
`)
export const ALL_BOOKS = graphql(`
  query GetBooks($page: Int, $limit: Int, $filter: BookFilterInput, $sort: BookSortBy) {
    getBooks(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      books {
        id
        title
        rating
        bookCoverThumbnail
        readDate {
          readEnd
        }
        author {
          surname
          name
        }
      }
      totalCount
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

export const UPDATE_BOOK_PLOT = graphql(`
  mutation UpdateBookPlot($input: UpdateBookPlotInput!) {
    bookInfo: updateBookPlot(input: $input) {
      id
      plot
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

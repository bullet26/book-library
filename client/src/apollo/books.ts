import { gql } from '@apollo/client'

export const ALL_BOOKS_BY_DATE = gql`
  query GetAllBooksByDate($page: Int, $limit: Int) {
    getAllBooksByDate(page: $page, limit: $limit) {
      readDate {
        id: _id
        books {
          id: _id
          title
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
`
export const ONE_BOOK_BY_ID = gql`
  query GetOneBookId($id: ID) {
    book: getOneBook(id: $id) {
      author {
        surname
        name
        id: _id
      }
      title
      rating
      series {
        title
        booksInSeries {
          id: _id
          title
          bookCoverThumbnail
        }
      }
      description
      readDate {
        readEnd
      }
      bookCover
    }
  }
`

export const ONE_BOOK_PLOT = gql`
  query GetOneBookPlot($bookID: ID) {
    book: getOneBookPlot(bookID: $bookID) {
      plot
    }
  }
`
export const ALL_BOOKS_BY_SPECIFIC_DATE = gql`
  query GetAllBooksBySpecificDate($year: Int) {
    bookInYear: getAllBooksBySpecificDate(year: $year) {
      books {
        id: _id
        title
        bookCoverThumbnail
        author {
          surname
          name
        }
      }
      readEnd
      id: _id
    }
  }
`
export const CREATE_BOOK = gql`
  mutation Mutation($input: BookInput) {
    bookInfo: addBook(input: $input) {
      title
      author {
        name
        surname
      }
    }
  }
`

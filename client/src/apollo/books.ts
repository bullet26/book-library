import gql from 'graphql-tag'

export const ALL_BOOKS_BY_DATE = gql`
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
`
export const ONE_BOOK_BY_ID = gql`
  query GetOneBookId($id: ID) {
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
`

export const ALL_BOOKS_BY_TAG = gql`
  query GetBooksByTag($id: ID, $sortBy: String) {
    tagData: getTagById(id: $id, sortBy: $sortBy) {
      tag
      booksInTag {
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

export const CREATE_READ_DATE = gql`
  mutation Mutation($input: ReadDateInput) {
    bookInfo: addReadDate(input: $input) {
      readEnd
      books {
        title
      }
    }
  }
`

export const ALL_MEDIA_FOR_BOOK = gql`
  query Query($id: ID) {
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
`

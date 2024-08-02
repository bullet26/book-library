import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query GetAllAuthors($page: Int, $limit: Int) {
    getAllAuthors(page: $page, limit: $limit) {
      authors {
        id: _id
        name
        surname
        portraitThumbnail
      }
      totalCount
    }
  }
`

export const ONE_AUTHOR_BY_ID = gql`
  query GetOneAuthor($id: ID) {
    author: getOneAuthor(id: $id) {
      name
      surname
      portrait
      series {
        title
        booksInSeries {
          title
          bookCoverThumbnail
          rating
          id: _id
        }
      }
      booksWithoutSeries {
        title
        bookCoverThumbnail
        rating
        id: _id
      }
    }
  }
`
export const CREATE_AUTHOR = gql`
  mutation Mutation($input: AuthorInput) {
    authorInfo: creteAuthor(input: $input) {
      surname
      name
    }
  }
`
export const ALL_AUTHORS_BY_BOOKS_COUNT = gql`
  query GetAllAuthorsByBooksCount {
    author: getAllAuthorsByBooksCount {
      name
      surname
      id
      portraitThumbnail
      count
    }
  }
`

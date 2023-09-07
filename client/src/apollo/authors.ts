import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query GetAllAuthors($page: Int, $limit: Int) {
    getAllAuthors(page: $page, limit: $limit) {
      authors {
        id: _id
        name
        surname
        portrait
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
          bookCover
          id: _id
        }
      }
      booksWithoutSeries {
        title
        bookCover
        id: _id
      }
    }
  }
`

import { gql } from '@apollo/client'

export const SEARCH_IN_BOOKS_AND_AUTHORS = gql`
  query Search($searchString: String) {
    search(searchString: $searchString) {
      __typename
      ... on Book {
        id: _id
        title
      }
      ... on Author {
        id: _id
        name
        surname
      }
    }
  }
`

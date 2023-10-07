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

export const SEARCH_IN_AUTHORS = gql`
  query Search($searchString: String) {
    authors: searchInAuthors(searchString: $searchString) {
      id: _id
      surname
      name
    }
  }
`
export const SEARCH_IN_SERIES = gql`
  query Search($searchString: String) {
    series: searchInSeries(searchString: $searchString) {
      id: _id
      title
    }
  }
`

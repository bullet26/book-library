import gql from 'graphql-tag'

export const SEARCH_IN_BOOKS_AND_AUTHORS = gql`
  query Search($searchString: String) {
    search(searchString: $searchString) {
      __typename
      ... on Book {
        id
        title
      }
      ... on Author {
        id
        name
        surname
      }
    }
  }
`

export const SEARCH_IN_AUTHORS = gql`
  query Search($searchString: String) {
    authors: searchInAuthors(searchString: $searchString) {
      id
      surname
      name
    }
  }
`
export const SEARCH_IN_SERIES = gql`
  query Search($searchString: String) {
    series: searchInSeries(searchString: $searchString) {
      id
      title
    }
  }
`
export const SEARCH_IN_BOOKS = gql`
  query Search($searchString: String) {
    books: searchInBooks(searchString: $searchString) {
      id
      title
      author {
        surname
        name
      }
    }
  }
`

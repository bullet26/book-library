import { graphql } from './__generated__'

export const SEARCH_IN_BOOKS_AND_AUTHORS = graphql(`
  query SearchInBooksAndAuthors($searchString: String!) {
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
`)

export const SEARCH_IN_AUTHORS = graphql(`
  query SearchInAuthors($searchString: String!) {
    authors: searchInAuthors(searchString: $searchString) {
      id
      surname
      name
    }
  }
`)

export const SEARCH_IN_SERIES = graphql(`
  query SearchInSeries($searchString: String!) {
    series: searchInSeries(searchString: $searchString) {
      id
      title
    }
  }
`)

export const SEARCH_IN_BOOKS = graphql(`
  query SearchInBooks($searchString: String!) {
    books: searchInBooks(searchString: $searchString) {
      id
      title
      author {
        surname
        name
      }
    }
  }
`)

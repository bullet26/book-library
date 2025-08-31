import { gql } from '@apollo/client'

export const MOST_READ_BOOKS = gql`
  query GetMostReadBooks {
    books: getMostReadBooks {
      bookTitle
      count
      author
    }
  }
`

export const MOST_READ_AUTHORS = gql`
  query GetMostReadBooks {
    authors: getMostReadAuthors {
      name
      surname
      count
    }
  }
`

export const READ_STATISTIC = gql`
  query GetMostReadBooks($label: String, $year: Int) {
    statistic: getReadStatistic(label: $label, year: $year) {
      count
      period
    }
  }
`

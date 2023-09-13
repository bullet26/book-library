import { gql } from '@apollo/client'

export const MOST_READED_BOOKS = gql`
  query GetMostReadedBooks {
    books: getMostReadedBooks {
      bookTitle
      count
      author
    }
  }
`

export const MOST_READED_AUTHORS = gql`
  query GetMostReadedBooks {
    authors: getMostReadedAuthors {
      name
      surname
      count
    }
  }
`

export const READ_STATISTIC = gql`
  query GetMostReadedBooks($label: String, $year: Int) {
    statistic: getReadStatistic(label: $label, year: $year) {
      count
      period
    }
  }
`

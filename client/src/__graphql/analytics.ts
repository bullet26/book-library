import { graphql } from './__generated__'

export const MOST_READ_BOOKS = graphql(`
  query GetMostReadBooks {
    books: getMostReadBooks {
      bookTitle
      count
      author
    }
  }
`)

export const MOST_READ_AUTHORS = graphql(`
  query GetMostReadAuthors {
    authors: getMostReadAuthors {
      name
      surname
      count
    }
  }
`)

export const READ_STATISTIC = graphql(`
  query GetReadStatistic($label: String!, $year: Int) {
    statistic: getReadStatistic(label: $label, year: $year) {
      count
      period
    }
  }
`)

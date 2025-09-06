import { gql } from '@apollo/client'

export const ALL_TAGS = gql`
  query GetAllTags {
    tags: getAllTags {
      id
      tag
    }
  }
`

export const CREATE_LINK_TAG_WITH_BOOK = gql`
  mutation Mutation($input: BookTagRelationsInput) {
    book: linkBookWithTag(input: $input) {
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
    }
  }
`

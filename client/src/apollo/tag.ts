import { gql } from '@apollo/client'

export const ALL_TAGS = gql`
  query GetAllTags {
    tags: getAllTags {
      id: _id
      tag
    }
  }
`

export const CREATE_LINK_TAG_WITH_BOOK = gql`
  mutation Mutation($input: BookTagRelationsInput) {
    book: linkBookWithTag(input: $input) {
      id: _id
      author {
        surname
        name
        id: _id
      }
      title
      rating
      series {
        title
        booksInSeries {
          id: _id
          title
          bookCoverThumbnail
        }
      }
      description
      readDate {
        readEnd
      }
      tags {
        id: _id
        tag
      }
      bookCover
    }
  }
`

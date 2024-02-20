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
    linkBookWithTag(input: $input) {
      booksInTag {
        title
      }
    }
  }
`

import gql from 'graphql-tag'

export const CREATE_BOOK = gql`
  mutation Mutation($input: BookInput) {
    bookInfo: addBook(input: $input) {
      title
      author {
        name
        surname
      }
    }
  }
`

export const ADD_MEDIA = gql`
  mutation AddAdditionalMedia($input: [AdditionalMediaInput]) {
    bookInfo: addAdditionalMedia(input: $input) {
      title
      isAdditionalMediaExist
    }
  }
`

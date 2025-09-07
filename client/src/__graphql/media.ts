import { graphql } from './__generated__'

export const ADD_MEDIA = graphql(`
  mutation AddAdditionalMedia($input: [AdditionalMediaInput]!) {
    bookInfo: addAdditionalMedia(input: $input) {
      title
      isAdditionalMediaExist
    }
  }
`)

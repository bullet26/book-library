import { gql } from '@apollo/client'

export const CREATE_SERIE = gql`
  mutation Mutation($input: SerieInput) {
    serieInfo: creteSerie(input: $input) {
      title
    }
  }
`

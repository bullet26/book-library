import gql from 'graphql-tag'

export const CREATE_SERIE = gql`
  mutation Mutation($input: SerieInput) {
    serieInfo: creteSerie(input: $input) {
      title
    }
  }
`

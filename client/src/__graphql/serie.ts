import { graphql } from './__generated__'

export const CREATE_SERIE = graphql(`
  mutation CreateSerie($input: SerieInput!) {
    serieInfo: createSerie(input: $input) {
      title
    }
  }
`)

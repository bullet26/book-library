import { graphql } from './__generated__'

export const ALL_TAGS = graphql(`
  query GetAllTags {
    tags: getAllTags {
      id
      tag
    }
  }
`)

export const CREATE_LINK_TAG_WITH_BOOK = graphql(`
  mutation CreteLinkedTag($input: BookTagRelationsInput!) {
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
`)

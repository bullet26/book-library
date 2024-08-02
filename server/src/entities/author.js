const typeAuthor = `
  "Author data"
  type Author {
    _id: ID
    name: String!
    surname: String
    transcriptionName: String
    portrait: String
    portraitThumbnail: String
    books: [Book]
    series: [Series]
    booksWithoutSeries: [Book]
  }
  "Author data + total сount"
  type AuthorResponse {
    totalCount: Int
    authors: [Author]
  }
  "Author data without pagination"
  type AuthorMostReadeResponse {
    id: ID
    count: Int
    name: String!
    surname: String
    portraitThumbnail: String

  }

  "data for add author"
  input AuthorInput {
    name: String
    surname: String!
    portrait: String
    portraitThumbnail: String
    transcriptionName: String
}
  `;

const typeAuthorResolvers = `
  "Get a list of authors"
  getAllAuthors(limit: Int = 50, page: Int = 1): AuthorResponse
  "Get a list of authors sorted by count reded books"
  getAllAuthorsByBooksCount: [AuthorMostReadeResponse]
  "Get one author by id"
  getOneAuthor(id: ID): Author
  `;

const typeAuthorMutation = `
  "Add author"
  creteAuthor(input: AuthorInput): Author
  `;

export const author = {
    typeAuthor,
    typeAuthorResolvers,
    typeAuthorMutation,
};

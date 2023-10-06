const typeAuthor = `
  "Author data"
  type Author {
    _id: ID
    name: String!
    surname: String
    transcriptionName: String
    portrait: String
    books: [Book]
    series: [Series]
    booksWithoutSeries: [Book]
  }
  "Author data + total сount"
  type AuthorResponse {
    totalCount: Int
    authors: [Author]
  }
  "data for add author"
  input AuthorInput {
    name: String
    surname: String!
    portrait: String
    transcriptionName: String
}
  `;

const typeAuthorResolvers = `
  "Get a list of authors"
  getAllAuthors(limit: Int = 50, page: Int = 1): AuthorResponse
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

const typeBook = `
  "Book data"
  type Book {
    _id: ID
    authorID: ID! 
    author: Author
    title: String!
    rating: Float
    seriesID: ID
    series: Series 
    seriesNumber: Int
    pages: Int
    notes: String
    description: String
    readDate: [ReadDate]
    bookCover: String
  }
  "Book data + total сount"
  type BooksResponse {
    totalCount: Int
    books: [Book]
  }
  "data for add book"
  input BookInput {
    authorID: ID! 
    title: String!
    rating: Float
    seriesID: ID
    seriesNumber: Int
    pages: Int
    notes: String
    description: String
    readEnd: Date
    plot: String
    bookCover: String
}
  `;

const typeBookResolvers = `
    "Get a list of books (unique values), that were sorted by title"
    getAllBooksByName(limit: Int = 50, page: Int = 1): BooksResponse
    "Get one book by id"
    getOneBook(id: ID): Book
  `;

const typeBookMutation = `
  "Add book"
  addBook(input: BookInput): Book
  `;

export const book = {
    typeBook,
    typeBookResolvers,
    typeBookMutation,
};

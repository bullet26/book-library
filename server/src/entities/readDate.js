const typeReadDate = `
  "read date data"
  type ReadDate {
    _id: ID
    bookID: ID!
    books: Book
    readEnd: Date!    
  }
  "readed books data + total сount"
  type ReadedBooksResponse {
    totalCount: Int
    readDate: [ReadDate]
  }
  "data for add reread book"
  input ReadDateInput {
    bookID: ID!
    readEnd: Date!
  }
  `;

const typeReadDateResolvers = `
"Get a list of readed books, that were sorted by date"
getAllBooksByDate(limit: Int = 100, page: Int = 1): ReadedBooksResponse
"Get a list of readed books read in specific year"
getAllBooksBySpecificDate(year: Int): [ReadDate]
`;

const typeReadDateMutation = `
  "Add new date for reread book"
  addReadDate(input: ReadDateInput): ReadDate
  `;

export const readDate = {
    typeReadDate,
    typeReadDateResolvers,
    typeReadDateMutation,
};

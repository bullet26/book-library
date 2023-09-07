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
  `;

const typeReadDateResolvers = `
"Get a list of readed books, that were sorted by date"
getAllBooksByDate(limit: Int = 100, page: Int = 1): ReadedBooksResponse
`;

export const readDate = {
    typeReadDate,
    typeReadDateResolvers,
};

const typeAnalytics = `
  "Book data + сount"
  type BooksStatisticResponse {
    count: Int
    bookTitle: String
    author: String
  }
  "Author data + сount"
  type AuthorsStatisticResponse {
    count: Int
    surname: String
    name: String
  }
  "statistic per months in year, or per years in all time"
  type Statistic {
    count: Int
    period: String
  }
  `;

const typeAnalyticsResolvers = `
    "Get a list of books, which were readed more times than others"
    getMostReadedBooks: [BooksStatisticResponse]
    "Get a list of authors, which were readed more times than others"
    getMostReadedAuthors: [AuthorsStatisticResponse]
    "Get read statistic per months, years"
    getReadStatistic(year: Int, label: String ): [Statistic]
  `;

export const analytics = {
    typeAnalytics,
    typeAnalyticsResolvers,
};

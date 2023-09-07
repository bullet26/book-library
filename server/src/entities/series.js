const typeSeries = `
  "Series data"
  type Series {
    _id: ID
    authorID: ID! 
    title: String!
    booksInSeries: [Book]
  }`;

export const series = {
    typeSeries,
};

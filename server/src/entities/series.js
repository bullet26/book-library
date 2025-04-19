const typeSeries = `
  "Series data"
  type Series {
    _id: ID
    authorID: ID! 
    title: String!
    booksInSeries: [Book]
  }
    
    "data for add series"
  input SerieInput {
      authorID: ID! 
      title: String!
  } 
`;

const typeSeriesMutation = `
  "Add serie"
  creteSerie(input: SerieInput): Series
`;

export const series = {
    typeSeries,
    typeSeriesMutation,
};

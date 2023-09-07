const typeDescriptionPlot = `
  "description plot data"
  type DescriptionPlot {
    _id: ID
    bookID: ID!
    plot: String
  }
  input BookPlotInput {
    bookID: ID! 
    plot: String!
}
`;

const typeDescriptionPlotResolvers = `
"Get one book plot by id"
  getOneBookPlot(bookID: ID): DescriptionPlot
`;

const typeDescriptionPlotMutation = `
  "Add book plot"
  addBookPlot(input: BookPlotInput): DescriptionPlot
  `;

export const descriptionPlot = {
    typeDescriptionPlot,
    typeDescriptionPlotResolvers,
    typeDescriptionPlotMutation,
};

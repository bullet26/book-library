import { book } from './book.js';
import { author } from './author.js';
import { series } from './series.js';
import { readDate } from './readDate.js';
import { descriptionPlot } from './descriptionPlot.js';

export const typeDefs = `
#graphql
scalar Date
scalar Upload
    ${book.typeBook}
    ${author.typeAuthor}
    ${series.typeSeries}
    ${readDate.typeReadDate}
    ${descriptionPlot.typeDescriptionPlot}
    union SearchResult = Book | Author
    type Query {
        ${book.typeBookResolvers}
        ${author.typeAuthorResolvers}
        ${readDate.typeReadDateResolvers}
        ${descriptionPlot.typeDescriptionPlotResolvers}
        search(searchString: String): [SearchResult!]
   }
   type Mutation {
    ${author.typeAuthorMutation}
    ${book.typeBookMutation}
    ${descriptionPlot.typeDescriptionPlotMutation}
}
`;

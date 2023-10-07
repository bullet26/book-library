import { book } from './book.js';
import { author } from './author.js';
import { series } from './series.js';
import { readDate } from './readDate.js';
import { descriptionPlot } from './descriptionPlot.js';
import { analytics } from './ahalytics.js';
import { search } from './search.js';

export const typeDefs = `
#graphql
scalar Date
scalar Upload
    ${book.typeBook}
    ${author.typeAuthor}
    ${series.typeSeries}
    ${readDate.typeReadDate}
    ${descriptionPlot.typeDescriptionPlot}
    ${analytics.typeAnalytics}
    union SearchResult = Book | Author
    type Query {
        ${book.typeBookResolvers}
        ${author.typeAuthorResolvers}
        ${readDate.typeReadDateResolvers}
        ${descriptionPlot.typeDescriptionPlotResolvers}    
        ${analytics.typeAnalyticsResolvers}
        ${search.typeSearchResolvers}
   }
   type Mutation {
    ${author.typeAuthorMutation}
    ${book.typeBookMutation}
    ${descriptionPlot.typeDescriptionPlotMutation}
}
`;

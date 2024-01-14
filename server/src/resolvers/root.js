import { BookResolver, BookQuery, BookMutation } from './book/index.js';
import { AuthorResolver, AuthorQuery, AuthorMutation } from './author/index.js';
import { ReadDateResolver, ReadDateQuery, ReadDateMutation } from './readDate/index.js';
import { DescriptionPlotQuery, DescriptionPlotMutation } from './descriptionPlot/index.js';
import { SearchResolver, SearchQuery } from './search/index.js';
import { SeriesResolver } from './series/index.js';
import { AnalyticsQuery } from './analytics/index.js';
import { dateScalar } from '../scalars/Date.js';

export const rootResolver = {
    Date: dateScalar,
    Book: { ...BookResolver },
    Author: { ...AuthorResolver },
    ReadDate: { ...ReadDateResolver },
    Series: { ...SeriesResolver },
    SearchResult: { ...SearchResolver },
    Query: { ...BookQuery, ...AuthorQuery, ...ReadDateQuery, ...DescriptionPlotQuery, ...SearchQuery, ...AnalyticsQuery },
    Mutation: { ...AuthorMutation, ...BookMutation, ...DescriptionPlotMutation, ...ReadDateMutation },
};

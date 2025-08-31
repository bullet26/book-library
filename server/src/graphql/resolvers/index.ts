import { mergeResolvers } from '@graphql-tools/merge';

import { additionalMediaResolvers } from './additionalMedia';
import { dateScalar } from '../scalar';
import { authorResolvers } from './author';
import { bookResolvers } from './book';
import { descriptionPlotResolvers } from './descriptionPlot';
import { readDateResolvers } from './readDate';
import { searchResolvers } from './search';
import { seriesResolvers } from './series';
import { tagResolvers } from './tags';

export const resolvers = mergeResolvers([
    { Date: dateScalar },
    additionalMediaResolvers,
    authorResolvers,
    bookResolvers,
    descriptionPlotResolvers,
    readDateResolvers,
    searchResolvers,
    seriesResolvers,
    tagResolvers,
]);

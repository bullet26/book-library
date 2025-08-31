import { mergeResolvers } from '@graphql-tools/merge';

import { SeriesResolver } from './resolver.js';
import { SeriesMutation } from './mutation.js';

export const seriesResolvers = mergeResolvers([{ Mutation: SeriesMutation }, { Series: SeriesResolver }]);

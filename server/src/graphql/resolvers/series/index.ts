import { mergeResolvers } from '@graphql-tools/merge';

import { SeriesResolver } from './resolver';
import { SeriesMutation } from './mutation';

export const seriesResolvers = mergeResolvers([{ Mutation: SeriesMutation }, { series: SeriesResolver }]);

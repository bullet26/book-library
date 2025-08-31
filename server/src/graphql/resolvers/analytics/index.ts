import { mergeResolvers } from '@graphql-tools/merge';

import { AnalyticsQuery } from './query.js';

export const additionalMediaResolvers = mergeResolvers([{ Query: AnalyticsQuery }]);

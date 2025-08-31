import { mergeResolvers } from '@graphql-tools/merge';

import { AnalyticsQuery } from './query';

export const additionalMediaResolvers = mergeResolvers([{ Query: AnalyticsQuery }]);

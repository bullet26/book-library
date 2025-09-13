import { mergeResolvers } from '@graphql-tools/merge';

import { DescriptionPlotMutation } from './mutation.js';
import { DescriptionPlotQuery } from './query.js';

export const descriptionPlotResolvers = mergeResolvers([{ Query: DescriptionPlotQuery }, { Mutation: DescriptionPlotMutation }]);

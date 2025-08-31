import { mergeResolvers } from '@graphql-tools/merge';

import { DescriptionPlotQuery } from './query.js';
import { DescriptionPlotMutation } from './mutation.js';

export const descriptionPlotResolvers = mergeResolvers([{ Query: DescriptionPlotQuery }, { Mutation: DescriptionPlotMutation }]);

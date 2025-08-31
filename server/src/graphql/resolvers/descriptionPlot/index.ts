import { mergeResolvers } from '@graphql-tools/merge';

import { DescriptionPlotQuery } from './query';
import { DescriptionPlotMutation } from './mutation';

export const descriptionPlotResolvers = mergeResolvers([{ Query: DescriptionPlotQuery }, { Mutation: DescriptionPlotMutation }]);

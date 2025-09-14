import { mergeResolvers } from '@graphql-tools/merge';

import { AdditionalMediaMutation } from './mutation.js';

export const additionalMediaResolvers = mergeResolvers([{ Mutation: AdditionalMediaMutation }]);

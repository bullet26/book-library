import { mergeResolvers } from '@graphql-tools/merge';

import { AdditionalMediaMutation } from './mutation';

export const additionalMediaResolvers = mergeResolvers([{ Mutation: AdditionalMediaMutation }]);

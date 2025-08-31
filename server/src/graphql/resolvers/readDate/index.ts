import { mergeResolvers } from '@graphql-tools/merge';

import { ReadDateResolver } from './resolver';
import { ReadDateMutation } from './mutation';
import { ReadDateQuery } from './query';

export const readDateResolvers = mergeResolvers([{ Query: ReadDateQuery }, { Mutation: ReadDateMutation }, { ReadDate: ReadDateResolver }]);

import { mergeResolvers } from '@graphql-tools/merge';

import { AuthorMutation } from './mutation.js';
import { AuthorQuery } from './query.js';
import { AuthorResolver } from './resolver.js';

export const authorResolvers = mergeResolvers([{ Query: AuthorQuery }, { Mutation: AuthorMutation }, { Author: AuthorResolver }]);

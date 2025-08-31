import { mergeResolvers } from '@graphql-tools/merge';
import { AuthorQuery } from './query';
import { AuthorMutation } from './mutation';
import { AuthorResolver } from './resolver';

export const authorResolvers = mergeResolvers([{ Query: AuthorQuery }, { Mutation: AuthorMutation }, { Author: AuthorResolver }]);

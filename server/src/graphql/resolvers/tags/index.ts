import { mergeResolvers } from '@graphql-tools/merge';
import { TagsQuery } from './query.js';
import { TagsMutation } from './mutation.js';
import { TagsResolver } from './resolver.js';

export const tagResolvers = mergeResolvers([{ Query: TagsQuery }, { Mutation: TagsMutation }, { Tags: TagsResolver }]);

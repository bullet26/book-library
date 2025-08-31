import { mergeResolvers } from '@graphql-tools/merge';
import { SearchQuery } from './query';
import { SearchResolver } from './resolver';

export const searchResolvers = mergeResolvers([{ Query: SearchQuery }, { SearchResult: SearchResolver }]);

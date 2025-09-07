import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AdditionalMedia = {
  __typename?: 'AdditionalMedia';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
};

export type AdditionalMediaInput = {
  bookID: Scalars['ID']['input'];
  type: MediaType;
  url: Scalars['String']['input'];
};

export type AllMediaForItem = {
  __typename?: 'AllMediaForItem';
  image?: Maybe<Array<Maybe<AdditionalMedia>>>;
  video?: Maybe<Array<Maybe<AdditionalMedia>>>;
};

export type Author = {
  __typename?: 'Author';
  books?: Maybe<Array<Maybe<Book>>>;
  booksWithoutSeries?: Maybe<Array<Maybe<Book>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portrait?: Maybe<Scalars['String']['output']>;
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  series?: Maybe<Array<Maybe<Series>>>;
  surname?: Maybe<Scalars['String']['output']>;
  transcriptionName?: Maybe<Scalars['String']['output']>;
};

export type AuthorInput = {
  name: Scalars['String']['input'];
  portrait?: InputMaybe<Scalars['String']['input']>;
  portraitThumbnail?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  transcriptionName?: InputMaybe<Scalars['String']['input']>;
};

export type AuthorMostReadResponse = {
  __typename?: 'AuthorMostReadResponse';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type AuthorResponse = {
  __typename?: 'AuthorResponse';
  authors: Array<Maybe<Author>>;
  totalCount: Scalars['Int']['output'];
};

export type AuthorsStatisticResponse = {
  __typename?: 'AuthorsStatisticResponse';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  additionalMedia?: Maybe<AllMediaForItem>;
  author: Author;
  authorID: Scalars['ID']['output'];
  bookCover?: Maybe<Scalars['String']['output']>;
  bookCoverThumbnail?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAdditionalMediaExist: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  readDate: Array<Maybe<ReadDate>>;
  series?: Maybe<Series>;
  seriesID?: Maybe<Scalars['ID']['output']>;
  seriesNumber?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Maybe<Tags>>>;
  title: Scalars['String']['output'];
};

export type BookInput = {
  authorID: Scalars['ID']['input'];
  bookCover?: InputMaybe<Scalars['String']['input']>;
  bookCoverThumbnail?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  plot?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  readEnd: Scalars['Date']['input'];
  seriesID?: InputMaybe<Scalars['ID']['input']>;
  seriesNumber?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type BookPlotInput = {
  bookID: Scalars['ID']['input'];
  plot: Scalars['String']['input'];
};

export type BookTagRelations = {
  __typename?: 'BookTagRelations';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  tagID: Scalars['ID']['output'];
};

export type BookTagRelationsInput = {
  bookID: Scalars['ID']['input'];
  tagID: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type BooksResponse = {
  __typename?: 'BooksResponse';
  books: Array<Maybe<Book>>;
  totalCount: Scalars['Int']['output'];
};

export type BooksStatisticResponse = {
  __typename?: 'BooksStatisticResponse';
  author: Scalars['String']['output'];
  bookTitle: Scalars['String']['output'];
  count: Scalars['Int']['output'];
};

export type DescriptionPlot = {
  __typename?: 'DescriptionPlot';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  plot: Scalars['String']['output'];
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAdditionalMedia?: Maybe<Book>;
  addBook: Book;
  addBookPlot: DescriptionPlot;
  addReadDate: ReadDate;
  createAuthor: Author;
  createSerie: Series;
  linkBookWithTag?: Maybe<Book>;
};


export type MutationAddAdditionalMediaArgs = {
  input: Array<InputMaybe<AdditionalMediaInput>>;
};


export type MutationAddBookArgs = {
  input: BookInput;
};


export type MutationAddBookPlotArgs = {
  input: BookPlotInput;
};


export type MutationAddReadDateArgs = {
  input: ReadDateInput;
};


export type MutationCreateAuthorArgs = {
  input: AuthorInput;
};


export type MutationCreateSerieArgs = {
  input: SerieInput;
};


export type MutationLinkBookWithTagArgs = {
  input: BookTagRelationsInput;
};

export type Query = {
  __typename?: 'Query';
  getAllAuthors: AuthorResponse;
  getAllAuthorsByBooksCount: Array<Maybe<AuthorMostReadResponse>>;
  getAllBooksByDate: ReadBooksResponse;
  getAllBooksByName: BooksResponse;
  getAllBooksBySpecificDate: Array<Maybe<ReadDate>>;
  getAllTags: Array<Maybe<Tags>>;
  getMostReadAuthors: Array<Maybe<AuthorsStatisticResponse>>;
  getMostReadBooks: Array<Maybe<BooksStatisticResponse>>;
  getOneAuthor?: Maybe<Author>;
  getOneBook?: Maybe<Book>;
  getOneBookPlot?: Maybe<DescriptionPlot>;
  getReadStatistic: Array<Maybe<Statistic>>;
  getTagById?: Maybe<Tags>;
  search: Array<Maybe<SearchResult>>;
  searchInAuthors: Array<Maybe<Author>>;
  searchInBooks: Array<Maybe<Book>>;
  searchInSeries: Array<Maybe<Series>>;
};


export type QueryGetAllAuthorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksByDateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksByNameArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksBySpecificDateArgs = {
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOneAuthorArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOneBookArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOneBookPlotArgs = {
  bookID?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetReadStatisticArgs = {
  label: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTagByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInAuthorsArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInBooksArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInSeriesArgs = {
  searchString: Scalars['String']['input'];
};

export type ReadBooksResponse = {
  __typename?: 'ReadBooksResponse';
  readDate: Array<Maybe<ReadDate>>;
  totalCount: Scalars['Int']['output'];
};

export type ReadDate = {
  __typename?: 'ReadDate';
  bookID: Scalars['ID']['output'];
  books?: Maybe<Book>;
  id: Scalars['ID']['output'];
  readEnd: Scalars['Date']['output'];
};

export type ReadDateInput = {
  bookID: Scalars['ID']['input'];
  readEnd: Scalars['Date']['input'];
};

export type SearchResult = Author | Book;

export type SerieInput = {
  authorID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Series = {
  __typename?: 'Series';
  authorID: Scalars['ID']['output'];
  booksInSeries?: Maybe<Array<Maybe<Book>>>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Statistic = {
  __typename?: 'Statistic';
  count: Scalars['Int']['output'];
  period: Scalars['String']['output'];
};

export type Tags = {
  __typename?: 'Tags';
  booksInTag?: Maybe<Array<Maybe<Book>>>;
  id: Scalars['ID']['output'];
  tag: Scalars['String']['output'];
};


export type TagsBooksInTagArgs = {
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  SearchResult: ( Author ) | ( Book );
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdditionalMedia: ResolverTypeWrapper<AdditionalMedia>;
  AdditionalMediaInput: AdditionalMediaInput;
  AllMediaForItem: ResolverTypeWrapper<AllMediaForItem>;
  Author: ResolverTypeWrapper<Author>;
  AuthorInput: AuthorInput;
  AuthorMostReadResponse: ResolverTypeWrapper<AuthorMostReadResponse>;
  AuthorResponse: ResolverTypeWrapper<AuthorResponse>;
  AuthorsStatisticResponse: ResolverTypeWrapper<AuthorsStatisticResponse>;
  Book: ResolverTypeWrapper<Book>;
  BookInput: BookInput;
  BookPlotInput: BookPlotInput;
  BookTagRelations: ResolverTypeWrapper<BookTagRelations>;
  BookTagRelationsInput: BookTagRelationsInput;
  BooksResponse: ResolverTypeWrapper<BooksResponse>;
  BooksStatisticResponse: ResolverTypeWrapper<BooksStatisticResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DescriptionPlot: ResolverTypeWrapper<DescriptionPlot>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MediaType: MediaType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadBooksResponse: ResolverTypeWrapper<ReadBooksResponse>;
  ReadDate: ResolverTypeWrapper<ReadDate>;
  ReadDateInput: ReadDateInput;
  SearchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SearchResult']>;
  SerieInput: SerieInput;
  Series: ResolverTypeWrapper<Series>;
  Statistic: ResolverTypeWrapper<Statistic>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tags: ResolverTypeWrapper<Tags>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdditionalMedia: AdditionalMedia;
  AdditionalMediaInput: AdditionalMediaInput;
  AllMediaForItem: AllMediaForItem;
  Author: Author;
  AuthorInput: AuthorInput;
  AuthorMostReadResponse: AuthorMostReadResponse;
  AuthorResponse: AuthorResponse;
  AuthorsStatisticResponse: AuthorsStatisticResponse;
  Book: Book;
  BookInput: BookInput;
  BookPlotInput: BookPlotInput;
  BookTagRelations: BookTagRelations;
  BookTagRelationsInput: BookTagRelationsInput;
  BooksResponse: BooksResponse;
  BooksStatisticResponse: BooksStatisticResponse;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  DescriptionPlot: DescriptionPlot;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ReadBooksResponse: ReadBooksResponse;
  ReadDate: ReadDate;
  ReadDateInput: ReadDateInput;
  SearchResult: ResolversUnionTypes<ResolversParentTypes>['SearchResult'];
  SerieInput: SerieInput;
  Series: Series;
  Statistic: Statistic;
  String: Scalars['String']['output'];
  Tags: Tags;
}>;

export type AdditionalMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdditionalMedia'] = ResolversParentTypes['AdditionalMedia']> = ResolversObject<{
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AllMediaForItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllMediaForItem'] = ResolversParentTypes['AllMediaForItem']> = ResolversObject<{
  image?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdditionalMedia']>>>, ParentType, ContextType>;
  video?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdditionalMedia']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  booksWithoutSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portrait?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  portraitThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transcriptionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorMostReadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorMostReadResponse'] = ResolversParentTypes['AuthorMostReadResponse']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portraitThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorResponse'] = ResolversParentTypes['AuthorResponse']> = ResolversObject<{
  authors?: Resolver<Array<Maybe<ResolversTypes['Author']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorsStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsStatisticResponse'] = ResolversParentTypes['AuthorsStatisticResponse']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  additionalMedia?: Resolver<Maybe<ResolversTypes['AllMediaForItem']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bookCover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bookCoverThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdditionalMediaExist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  readDate?: Resolver<Array<Maybe<ResolversTypes['ReadDate']>>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  seriesID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  seriesNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tags']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookTagRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookTagRelations'] = ResolversParentTypes['BookTagRelations']> = ResolversObject<{
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tagID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BooksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BooksResponse'] = ResolversParentTypes['BooksResponse']> = ResolversObject<{
  books?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BooksStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BooksStatisticResponse'] = ResolversParentTypes['BooksStatisticResponse']> = ResolversObject<{
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DescriptionPlotResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescriptionPlot'] = ResolversParentTypes['DescriptionPlot']> = ResolversObject<{
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAdditionalMedia?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationAddAdditionalMediaArgs, 'input'>>;
  addBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddBookArgs, 'input'>>;
  addBookPlot?: Resolver<ResolversTypes['DescriptionPlot'], ParentType, ContextType, RequireFields<MutationAddBookPlotArgs, 'input'>>;
  addReadDate?: Resolver<ResolversTypes['ReadDate'], ParentType, ContextType, RequireFields<MutationAddReadDateArgs, 'input'>>;
  createAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'input'>>;
  createSerie?: Resolver<ResolversTypes['Series'], ParentType, ContextType, RequireFields<MutationCreateSerieArgs, 'input'>>;
  linkBookWithTag?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationLinkBookWithTagArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllAuthors?: Resolver<ResolversTypes['AuthorResponse'], ParentType, ContextType, RequireFields<QueryGetAllAuthorsArgs, 'limit' | 'page'>>;
  getAllAuthorsByBooksCount?: Resolver<Array<Maybe<ResolversTypes['AuthorMostReadResponse']>>, ParentType, ContextType>;
  getAllBooksByDate?: Resolver<ResolversTypes['ReadBooksResponse'], ParentType, ContextType, RequireFields<QueryGetAllBooksByDateArgs, 'limit' | 'page'>>;
  getAllBooksByName?: Resolver<ResolversTypes['BooksResponse'], ParentType, ContextType, RequireFields<QueryGetAllBooksByNameArgs, 'limit' | 'page'>>;
  getAllBooksBySpecificDate?: Resolver<Array<Maybe<ResolversTypes['ReadDate']>>, ParentType, ContextType, Partial<QueryGetAllBooksBySpecificDateArgs>>;
  getAllTags?: Resolver<Array<Maybe<ResolversTypes['Tags']>>, ParentType, ContextType>;
  getMostReadAuthors?: Resolver<Array<Maybe<ResolversTypes['AuthorsStatisticResponse']>>, ParentType, ContextType>;
  getMostReadBooks?: Resolver<Array<Maybe<ResolversTypes['BooksStatisticResponse']>>, ParentType, ContextType>;
  getOneAuthor?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, Partial<QueryGetOneAuthorArgs>>;
  getOneBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, Partial<QueryGetOneBookArgs>>;
  getOneBookPlot?: Resolver<Maybe<ResolversTypes['DescriptionPlot']>, ParentType, ContextType, Partial<QueryGetOneBookPlotArgs>>;
  getReadStatistic?: Resolver<Array<Maybe<ResolversTypes['Statistic']>>, ParentType, ContextType, RequireFields<QueryGetReadStatisticArgs, 'label'>>;
  getTagById?: Resolver<Maybe<ResolversTypes['Tags']>, ParentType, ContextType, Partial<QueryGetTagByIdArgs>>;
  search?: Resolver<Array<Maybe<ResolversTypes['SearchResult']>>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'searchString'>>;
  searchInAuthors?: Resolver<Array<Maybe<ResolversTypes['Author']>>, ParentType, ContextType, RequireFields<QuerySearchInAuthorsArgs, 'searchString'>>;
  searchInBooks?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType, RequireFields<QuerySearchInBooksArgs, 'searchString'>>;
  searchInSeries?: Resolver<Array<Maybe<ResolversTypes['Series']>>, ParentType, ContextType, RequireFields<QuerySearchInSeriesArgs, 'searchString'>>;
}>;

export type ReadBooksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadBooksResponse'] = ResolversParentTypes['ReadBooksResponse']> = ResolversObject<{
  readDate?: Resolver<Array<Maybe<ResolversTypes['ReadDate']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReadDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDate'] = ResolversParentTypes['ReadDate']> = ResolversObject<{
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  books?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  readEnd?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Author' | 'Book', ParentType, ContextType>;
}>;

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = ResolversObject<{
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  booksInSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistic'] = ResolversParentTypes['Statistic']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tags'] = ResolversParentTypes['Tags']> = ResolversObject<{
  booksInTag?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, Partial<TagsBooksInTagArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AdditionalMedia?: AdditionalMediaResolvers<ContextType>;
  AllMediaForItem?: AllMediaForItemResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  AuthorMostReadResponse?: AuthorMostReadResponseResolvers<ContextType>;
  AuthorResponse?: AuthorResponseResolvers<ContextType>;
  AuthorsStatisticResponse?: AuthorsStatisticResponseResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookTagRelations?: BookTagRelationsResolvers<ContextType>;
  BooksResponse?: BooksResponseResolvers<ContextType>;
  BooksStatisticResponse?: BooksStatisticResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DescriptionPlot?: DescriptionPlotResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReadBooksResponse?: ReadBooksResponseResolvers<ContextType>;
  ReadDate?: ReadDateResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  Series?: SeriesResolvers<ContextType>;
  Statistic?: StatisticResolvers<ContextType>;
  Tags?: TagsResolvers<ContextType>;
}>;


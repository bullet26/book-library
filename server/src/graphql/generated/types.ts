import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}
export interface AdditionalMedia {
  __typename?: 'AdditionalMedia';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
}
export interface AdditionalMediaInput {
  bookID: Scalars['ID']['input'];
  type: MediaType;
  url: Scalars['String']['input'];
}
export type AdditionalMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdditionalMedia'] = ResolversParentTypes['AdditionalMedia']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;
export interface AllMediaForItem {
  __typename?: 'AllMediaForItem';
  image: AdditionalMedia[];
  video: AdditionalMedia[];
}
export type AllMediaForItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllMediaForItem'] = ResolversParentTypes['AllMediaForItem']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  image?: Resolver<ResolversTypes['AdditionalMedia'][], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['AdditionalMedia'][], ParentType, ContextType>;
}>;
export interface Author {
  __typename?: 'Author';
  books: Book[];
  booksWithoutSeries: Book[];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portrait?: Maybe<Scalars['String']['output']>;
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  series: Series[];
  surname?: Maybe<Scalars['String']['output']>;
  transcriptionName?: Maybe<Scalars['String']['output']>;
}
export interface AuthorInput {
  name: Scalars['String']['input'];
  portrait?: InputMaybe<Scalars['String']['input']>;
  portraitThumbnail?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  transcriptionName?: InputMaybe<Scalars['String']['input']>;
}
export interface AuthorMostReadResponse {
  __typename?: 'AuthorMostReadResponse';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
}

export type AuthorMostReadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorMostReadResponse'] = ResolversParentTypes['AuthorMostReadResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portraitThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  books?: Resolver<ResolversTypes['Book'][], ParentType, ContextType>;
  booksWithoutSeries?: Resolver<ResolversTypes['Book'][], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portrait?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  portraitThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series?: Resolver<ResolversTypes['Series'][], ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transcriptionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export interface AuthorResponse {
  __typename?: 'AuthorResponse';
  authors: Author[];
  totalCount: Scalars['Int']['output'];
}

export type AuthorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorResponse'] = ResolversParentTypes['AuthorResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  authors?: Resolver<ResolversTypes['Author'][], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export interface AuthorsStatisticResponse {
  __typename?: 'AuthorsStatisticResponse';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
}

export type AuthorsStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsStatisticResponse'] = ResolversParentTypes['AuthorsStatisticResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface Book {
  __typename?: 'Book';
  additionalMedia?: Maybe<AllMediaForItem>;
  author: Author;
  authorID: Scalars['ID']['output'];
  bookCover?: Maybe<Scalars['String']['output']>;
  bookCoverThumbnail?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdditionalMediaExist: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  readDate: ReadDate[];
  series?: Maybe<Series>;
  seriesID?: Maybe<Scalars['ID']['output']>;
  seriesNumber?: Maybe<Scalars['Int']['output']>;
  tags: Tags[];
  title: Scalars['String']['output'];
}

export interface BookInput {
  authorID: Scalars['ID']['input'];
  bookCover?: InputMaybe<Scalars['String']['input']>;
  bookCoverThumbnail?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  plot?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  readEnd: Scalars['Date']['input'];
  seriesID?: InputMaybe<Scalars['ID']['input']>;
  seriesNumber?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
}

export interface BookPlotInput {
  bookID: Scalars['ID']['input'];
  plot: Scalars['String']['input'];
}

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  additionalMedia?: Resolver<Maybe<ResolversTypes['AllMediaForItem']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bookCover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bookCoverThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdditionalMediaExist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  readDate?: Resolver<ResolversTypes['ReadDate'][], ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  seriesID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  seriesNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['Tags'][], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface BooksResponse {
  __typename?: 'BooksResponse';
  books: Book[];
  totalCount: Scalars['Int']['output'];
}

export type BooksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BooksResponse'] = ResolversParentTypes['BooksResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  books?: Resolver<ResolversTypes['Book'][], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export interface BooksStatisticResponse {
  __typename?: 'BooksStatisticResponse';
  author: Scalars['String']['output'];
  bookTitle: Scalars['String']['output'];
  count: Scalars['Int']['output'];
}

export type BooksStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BooksStatisticResponse'] = ResolversParentTypes['BooksStatisticResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export interface BookTagRelations {
  __typename?: 'BookTagRelations';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  tagID: Scalars['ID']['output'];
}

export interface BookTagRelationsInput {
  bookID: Scalars['ID']['input'];
  tagID: Scalars['ID']['input'][];
}

export type BookTagRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookTagRelations'] = ResolversParentTypes['BookTagRelations']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tagID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}


export interface DescriptionPlot {
  __typename?: 'DescriptionPlot';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  plot: Scalars['String']['output'];
}


export type DescriptionPlotResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescriptionPlot'] = ResolversParentTypes['DescriptionPlot']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;


export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };


export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };


export type InputMaybe<T> = Maybe<T>;


export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = Partial<Record<K, never>>;


export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };


export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };


export type Maybe<T> = null | T;


export interface Mutation {
  __typename?: 'Mutation';
  addAdditionalMedia: Book;
  addBook: Book;
  addBookPlot: DescriptionPlot;
  addReadDate: ReadDate;
  createAuthor: Author;
  createSerie: Series;
  linkBookWithTag: Book;
}


export interface MutationAddAdditionalMediaArgs {
  input: InputMaybe<AdditionalMediaInput>[];
}


export interface MutationAddBookArgs {
  input: BookInput;
}


export interface MutationAddBookPlotArgs {
  input: BookPlotInput;
}


export interface MutationAddReadDateArgs {
  input: ReadDateInput;
}


export interface MutationCreateAuthorArgs {
  input: AuthorInput;
}


export interface MutationCreateSerieArgs {
  input: SerieInput;
}


export interface MutationLinkBookWithTagArgs {
  input: BookTagRelationsInput;
}


export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAdditionalMedia?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddAdditionalMediaArgs, 'input'>>;
  addBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddBookArgs, 'input'>>;
  addBookPlot?: Resolver<ResolversTypes['DescriptionPlot'], ParentType, ContextType, RequireFields<MutationAddBookPlotArgs, 'input'>>;
  addReadDate?: Resolver<ResolversTypes['ReadDate'], ParentType, ContextType, RequireFields<MutationAddReadDateArgs, 'input'>>;
  createAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'input'>>;
  createSerie?: Resolver<ResolversTypes['Series'], ParentType, ContextType, RequireFields<MutationCreateSerieArgs, 'input'>>;
  linkBookWithTag?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationLinkBookWithTagArgs, 'input'>>;
}>;


export type NextResolverFn<T> = () => Promise<T>;

export interface Query {
  __typename?: 'Query';
  getAllAuthors: AuthorResponse;
  getAllAuthorsByBooksCount: AuthorMostReadResponse[];
  getAllBooksByDate: ReadBooksResponse;
  getAllBooksByName: BooksResponse;
  getAllBooksBySpecificDate: ReadDate[];
  getAllTags: Tags[];
  getMostReadAuthors: AuthorsStatisticResponse[];
  getMostReadBooks: BooksStatisticResponse[];
  getOneAuthor?: Maybe<Author>;
  getOneBook?: Maybe<Book>;
  getOneBookPlot?: Maybe<DescriptionPlot>;
  getReadStatistic: Statistic[];
  getTagById: Tags;
  search: SearchResult[];
  searchInAuthors: Author[];
  searchInBooks: Book[];
  searchInSeries: Series[];
}

export interface QueryGetAllAuthorsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGetAllBooksByDateArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGetAllBooksByNameArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGetAllBooksBySpecificDateArgs {
  year?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGetOneAuthorArgs {
  id?: InputMaybe<Scalars['ID']['input']>;
}

export interface QueryGetOneBookArgs {
  id?: InputMaybe<Scalars['ID']['input']>;
}

export interface QueryGetOneBookPlotArgs {
  bookID?: InputMaybe<Scalars['ID']['input']>;
}


export interface QueryGetReadStatisticArgs {
  label: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGetTagByIdArgs {
  id?: InputMaybe<Scalars['ID']['input']>;
}
export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllAuthors?: Resolver<ResolversTypes['AuthorResponse'], ParentType, ContextType, RequireFields<QueryGetAllAuthorsArgs, 'limit' | 'page'>>;
  getAllAuthorsByBooksCount?: Resolver<ResolversTypes['AuthorMostReadResponse'][], ParentType, ContextType>;
  getAllBooksByDate?: Resolver<ResolversTypes['ReadBooksResponse'], ParentType, ContextType, RequireFields<QueryGetAllBooksByDateArgs, 'limit' | 'page'>>;
  getAllBooksByName?: Resolver<ResolversTypes['BooksResponse'], ParentType, ContextType, RequireFields<QueryGetAllBooksByNameArgs, 'limit' | 'page'>>;
  getAllBooksBySpecificDate?: Resolver<ResolversTypes['ReadDate'][], ParentType, ContextType, Partial<QueryGetAllBooksBySpecificDateArgs>>;
  getAllTags?: Resolver<ResolversTypes['Tags'][], ParentType, ContextType>;
  getMostReadAuthors?: Resolver<ResolversTypes['AuthorsStatisticResponse'][], ParentType, ContextType>;
  getMostReadBooks?: Resolver<ResolversTypes['BooksStatisticResponse'][], ParentType, ContextType>;
  getOneAuthor?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, Partial<QueryGetOneAuthorArgs>>;
  getOneBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, Partial<QueryGetOneBookArgs>>;
  getOneBookPlot?: Resolver<Maybe<ResolversTypes['DescriptionPlot']>, ParentType, ContextType, Partial<QueryGetOneBookPlotArgs>>;
  getReadStatistic?: Resolver<ResolversTypes['Statistic'][], ParentType, ContextType, RequireFields<QueryGetReadStatisticArgs, 'label'>>;
  getTagById?: Resolver<ResolversTypes['Tags'], ParentType, ContextType, Partial<QueryGetTagByIdArgs>>;
  search?: Resolver<ResolversTypes['SearchResult'][], ParentType, ContextType, RequireFields<QuerySearchArgs, 'searchString'>>;
  searchInAuthors?: Resolver<ResolversTypes['Author'][], ParentType, ContextType, RequireFields<QuerySearchInAuthorsArgs, 'searchString'>>;
  searchInBooks?: Resolver<ResolversTypes['Book'][], ParentType, ContextType, RequireFields<QuerySearchInBooksArgs, 'searchString'>>;
  searchInSeries?: Resolver<ResolversTypes['Series'][], ParentType, ContextType, RequireFields<QuerySearchInSeriesArgs, 'searchString'>>;
}>;

export interface QuerySearchArgs {
  searchString: Scalars['String']['input'];
}


export interface QuerySearchInAuthorsArgs {
  searchString: Scalars['String']['input'];
}
export interface QuerySearchInBooksArgs {
  searchString: Scalars['String']['input'];
}

export interface QuerySearchInSeriesArgs {
  searchString: Scalars['String']['input'];
}

export interface ReadBooksResponse {
  __typename?: 'ReadBooksResponse';
  readDate: ReadDate[];
  totalCount: Scalars['Int']['output'];
}

export type ReadBooksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadBooksResponse'] = ResolversParentTypes['ReadBooksResponse']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  readDate?: Resolver<ResolversTypes['ReadDate'][], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export interface ReadDate {
  __typename?: 'ReadDate';
  bookID: Scalars['ID']['output'];
  books: Book;
  id: Scalars['ID']['output'];
  readEnd: Scalars['Date']['output'];
}

export interface ReadDateInput {
  bookID: Scalars['ID']['input'];
  readEnd: Scalars['Date']['input'];
}

export type ReadDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDate'] = ResolversParentTypes['ReadDate']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  bookID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  books?: Resolver<ResolversTypes['Book'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  readEnd?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolvers<ContextType = any> = ResolversObject<{
  AdditionalMedia?: AdditionalMediaResolvers<ContextType>;
  AllMediaForItem?: AllMediaForItemResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  AuthorMostReadResponse?: AuthorMostReadResponseResolvers<ContextType>;
  AuthorResponse?: AuthorResponseResolvers<ContextType>;
  AuthorsStatisticResponse?: AuthorsStatisticResponseResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BooksResponse?: BooksResponseResolvers<ContextType>;
  BooksStatisticResponse?: BooksStatisticResponseResolvers<ContextType>;
  BookTagRelations?: BookTagRelationsResolvers<ContextType>;
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

export type ResolversObject<TObject> = WithIndex<TObject>;

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
  BooksResponse: BooksResponse;
  BooksStatisticResponse: BooksStatisticResponse;
  BookTagRelations: BookTagRelations;
  BookTagRelationsInput: BookTagRelationsInput;
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
  BooksResponse: ResolverTypeWrapper<BooksResponse>;
  BooksStatisticResponse: ResolverTypeWrapper<BooksStatisticResponse>;
  BookTagRelations: ResolverTypeWrapper<BookTagRelations>;
  BookTagRelationsInput: BookTagRelationsInput;
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

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  SearchResult: ( Author ) | ( Book );
}>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export interface ResolverWithResolve<TResult, TParent, TContext, TArgs> {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  Boolean: { input: boolean; output: boolean; }
  Date: { input: any; output: any; }
  Float: { input: number; output: number; }
  ID: { input: string; output: string; }
  Int: { input: number; output: number; }
  String: { input: string; output: string; }
}

export type SearchResult = Author | Book;

export type SearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Author' | 'Book', ParentType, ContextType>;
}>;

export interface SerieInput {
  authorID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface Series {
  __typename?: 'Series';
  authorID: Scalars['ID']['output'];
  booksInSeries: Book[];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
}

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  booksInSeries?: Resolver<ResolversTypes['Book'][], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface Statistic {
  __typename?: 'Statistic';
  count: Scalars['Int']['output'];
  period: Scalars['String']['output'];
}

export type StatisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistic'] = ResolversParentTypes['Statistic']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
}

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  resolve?: SubscriptionResolveFn<TResult, Record<TKey, TResult>, TContext, TArgs>;
  subscribe: SubscriptionSubscribeFn<Record<TKey, TResult>, TParent, TContext, TArgs>;
}

export interface Tags {
  __typename?: 'Tags';
  booksInTag: Book[];
  id: Scalars['ID']['output'];
  tag: Scalars['String']['output'];
}

export interface TagsBooksInTagArgs {
  sortBy?: InputMaybe<Scalars['String']['input']>;
}

export type TagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tags'] = ResolversParentTypes['Tags']> = ResolversObject<{
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
  booksInTag?: Resolver<ResolversTypes['Book'][], ParentType, ContextType, Partial<TagsBooksInTagArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type WithIndex<TObject> = Record<string, any> & TObject;


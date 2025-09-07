/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
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

export type GetMostReadBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMostReadBooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'BooksStatisticResponse', bookTitle: string, count: number, author: string } | null> };

export type GetMostReadAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMostReadAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'AuthorsStatisticResponse', name: string, surname: string, count: number } | null> };

export type GetReadStatisticQueryVariables = Exact<{
  label: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReadStatisticQuery = { __typename?: 'Query', statistic: Array<{ __typename?: 'Statistic', count: number, period: string } | null> };

export type GetAllAuthorsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllAuthorsQuery = { __typename?: 'Query', getAllAuthors: { __typename?: 'AuthorResponse', totalCount: number, authors: Array<{ __typename?: 'Author', id: string, name: string, surname?: string | null, portraitThumbnail?: string | null } | null> } };

export type GetOneAuthorByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneAuthorByIdQuery = { __typename?: 'Query', author?: { __typename?: 'Author', name: string, surname?: string | null, portrait?: string | null, series?: Array<{ __typename?: 'Series', title: string, booksInSeries?: Array<{ __typename?: 'Book', title: string, bookCoverThumbnail?: string | null, rating?: number | null, id: string } | null> | null } | null> | null, booksWithoutSeries?: Array<{ __typename?: 'Book', title: string, bookCoverThumbnail?: string | null, rating?: number | null, id: string } | null> | null } | null };

export type CreateAuthorMutationVariables = Exact<{
  input: AuthorInput;
}>;


export type CreateAuthorMutation = { __typename?: 'Mutation', authorInfo: { __typename?: 'Author', surname?: string | null, name: string } };

export type GetAllAuthorsByBooksCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAuthorsByBooksCountQuery = { __typename?: 'Query', author: Array<{ __typename?: 'AuthorMostReadResponse', name: string, surname?: string | null, id: string, portraitThumbnail?: string | null, count: number } | null> };

export type GetAllBooksByDateQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllBooksByDateQuery = { __typename?: 'Query', getAllBooksByDate: { __typename?: 'ReadBooksResponse', totalCount: number, readDate: Array<{ __typename?: 'ReadDate', id: string, books?: { __typename?: 'Book', id: string, title: string, rating?: number | null, bookCoverThumbnail?: string | null, author: { __typename?: 'Author', surname?: string | null, name: string } } | null } | null> } };

export type GetOneBookByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneBookByIdQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: string, title: string, rating?: number | null, description?: string | null, bookCover?: string | null, isAdditionalMediaExist: boolean, author: { __typename?: 'Author', surname?: string | null, name: string, id: string }, series?: { __typename?: 'Series', title: string, booksInSeries?: Array<{ __typename?: 'Book', id: string, title: string, rating?: number | null, bookCoverThumbnail?: string | null } | null> | null } | null, readDate: Array<{ __typename?: 'ReadDate', readEnd: any } | null>, tags?: Array<{ __typename?: 'Tags', id: string, tag: string } | null> | null } | null };

export type GetOneBookPlotQueryVariables = Exact<{
  bookID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneBookPlotQuery = { __typename?: 'Query', book?: { __typename?: 'DescriptionPlot', plot: string } | null };

export type GetAllBooksBySpecificDateQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetAllBooksBySpecificDateQuery = { __typename?: 'Query', bookInYear: Array<{ __typename?: 'ReadDate', readEnd: any, id: string, books?: { __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null, rating?: number | null, author: { __typename?: 'Author', surname?: string | null, name: string } } | null } | null> };

export type GetBooksByTagQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBooksByTagQuery = { __typename?: 'Query', tagData?: { __typename?: 'Tags', tag: string, booksInTag?: Array<{ __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null, rating?: number | null, author: { __typename?: 'Author', surname?: string | null, name: string } } | null> | null } | null };

export type CreteBookMutationVariables = Exact<{
  input: BookInput;
}>;


export type CreteBookMutation = { __typename?: 'Mutation', bookInfo: { __typename?: 'Book', title: string, author: { __typename?: 'Author', name: string, surname?: string | null } } };

export type CreateReadDateMutationVariables = Exact<{
  input: ReadDateInput;
}>;


export type CreateReadDateMutation = { __typename?: 'Mutation', bookInfo: { __typename?: 'ReadDate', readEnd: any, books?: { __typename?: 'Book', title: string } | null } };

export type GetMediaForBookQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMediaForBookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: string, title: string, media?: { __typename?: 'AllMediaForItem', video?: Array<{ __typename?: 'AdditionalMedia', id: string, type: MediaType, url: string } | null> | null, image?: Array<{ __typename?: 'AdditionalMedia', id: string, url: string, type: MediaType } | null> | null } | null } | null };

export type AddAdditionalMediaMutationVariables = Exact<{
  input: Array<InputMaybe<AdditionalMediaInput>> | InputMaybe<AdditionalMediaInput>;
}>;


export type AddAdditionalMediaMutation = { __typename?: 'Mutation', bookInfo?: { __typename?: 'Book', title: string, isAdditionalMediaExist: boolean } | null };

export type SearchInBooksAndAuthorsQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
}>;


export type SearchInBooksAndAuthorsQuery = { __typename?: 'Query', search: Array<{ __typename: 'Author', id: string, name: string, surname?: string | null } | { __typename: 'Book', id: string, title: string } | null> };

export type SearchInAuthorsQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
}>;


export type SearchInAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', id: string, surname?: string | null, name: string } | null> };

export type SearchInSeriesQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
}>;


export type SearchInSeriesQuery = { __typename?: 'Query', series: Array<{ __typename?: 'Series', id: string, title: string } | null> };

export type SearchInBooksQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
}>;


export type SearchInBooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: string, title: string, author: { __typename?: 'Author', surname?: string | null, name: string } } | null> };

export type CreateSerieMutationVariables = Exact<{
  input: SerieInput;
}>;


export type CreateSerieMutation = { __typename?: 'Mutation', serieInfo: { __typename?: 'Series', title: string } };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tags', id: string, tag: string } | null> };

export type CreteLinkedTagMutationVariables = Exact<{
  input: BookTagRelationsInput;
}>;


export type CreteLinkedTagMutation = { __typename?: 'Mutation', book?: { __typename?: 'Book', id: string, title: string, rating?: number | null, description?: string | null, bookCover?: string | null, author: { __typename?: 'Author', surname?: string | null, name: string, id: string }, series?: { __typename?: 'Series', title: string, booksInSeries?: Array<{ __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null } | null> | null } | null, readDate: Array<{ __typename?: 'ReadDate', readEnd: any } | null>, tags?: Array<{ __typename?: 'Tags', id: string, tag: string } | null> | null } | null };


export const GetMostReadBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMostReadBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"books"},"name":{"kind":"Name","value":"getMostReadBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]} as unknown as DocumentNode<GetMostReadBooksQuery, GetMostReadBooksQueryVariables>;
export const GetMostReadAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMostReadAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"authors"},"name":{"kind":"Name","value":"getMostReadAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetMostReadAuthorsQuery, GetMostReadAuthorsQueryVariables>;
export const GetReadStatisticDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReadStatistic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"statistic"},"name":{"kind":"Name","value":"getReadStatistic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"period"}}]}}]}}]} as unknown as DocumentNode<GetReadStatisticQuery, GetReadStatisticQueryVariables>;
export const GetAllAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"portraitThumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>;
export const GetOneAuthorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneAuthorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"author"},"name":{"kind":"Name","value":"getOneAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"portrait"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"booksInSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"booksWithoutSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneAuthorByIdQuery, GetOneAuthorByIdQueryVariables>;
export const CreateAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"authorInfo"},"name":{"kind":"Name","value":"createAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const GetAllAuthorsByBooksCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAuthorsByBooksCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"author"},"name":{"kind":"Name","value":"getAllAuthorsByBooksCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portraitThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetAllAuthorsByBooksCountQuery, GetAllAuthorsByBooksCountQueryVariables>;
export const GetAllBooksByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBooksByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllBooksByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetAllBooksByDateQuery, GetAllBooksByDateQueryVariables>;
export const GetOneBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"booksInSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"readDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readEnd"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookCover"}},{"kind":"Field","name":{"kind":"Name","value":"isAdditionalMediaExist"}}]}}]}}]} as unknown as DocumentNode<GetOneBookByIdQuery, GetOneBookByIdQueryVariables>;
export const GetOneBookPlotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneBookPlot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBookPlot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plot"}}]}}]}}]} as unknown as DocumentNode<GetOneBookPlotQuery, GetOneBookPlotQueryVariables>;
export const GetAllBooksBySpecificDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBooksBySpecificDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookInYear"},"name":{"kind":"Name","value":"getAllBooksBySpecificDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"readEnd"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetAllBooksBySpecificDateQuery, GetAllBooksBySpecificDateQueryVariables>;
export const GetBooksByTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooksByTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tagData"},"name":{"kind":"Name","value":"getTagById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"booksInTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksByTagQuery, GetBooksByTagQueryVariables>;
export const CreteBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreteBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookInfo"},"name":{"kind":"Name","value":"addBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}}]}}]}}]}}]} as unknown as DocumentNode<CreteBookMutation, CreteBookMutationVariables>;
export const CreateReadDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReadDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReadDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookInfo"},"name":{"kind":"Name","value":"addReadDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readEnd"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateReadDateMutation, CreateReadDateMutationVariables>;
export const GetMediaForBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaForBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"media"},"name":{"kind":"Name","value":"additionalMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaForBookQuery, GetMediaForBookQueryVariables>;
export const AddAdditionalMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAdditionalMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdditionalMediaInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookInfo"},"name":{"kind":"Name","value":"addAdditionalMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isAdditionalMediaExist"}}]}}]}}]} as unknown as DocumentNode<AddAdditionalMediaMutation, AddAdditionalMediaMutationVariables>;
export const SearchInBooksAndAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInBooksAndAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Book"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}}]}}]}}]}}]} as unknown as DocumentNode<SearchInBooksAndAuthorsQuery, SearchInBooksAndAuthorsQueryVariables>;
export const SearchInAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"authors"},"name":{"kind":"Name","value":"searchInAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SearchInAuthorsQuery, SearchInAuthorsQueryVariables>;
export const SearchInSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"series"},"name":{"kind":"Name","value":"searchInSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SearchInSeriesQuery, SearchInSeriesQueryVariables>;
export const SearchInBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"books"},"name":{"kind":"Name","value":"searchInBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchInBooksQuery, SearchInBooksQueryVariables>;
export const CreateSerieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSerie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SerieInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"serieInfo"},"name":{"kind":"Name","value":"createSerie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateSerieMutation, CreateSerieMutationVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tags"},"name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const CreteLinkedTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreteLinkedTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookTagRelationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"linkBookWithTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"booksInSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"readDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readEnd"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookCover"}}]}}]}}]} as unknown as DocumentNode<CreteLinkedTagMutation, CreteLinkedTagMutationVariables>;
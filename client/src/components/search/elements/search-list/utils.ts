import type {
  SearchInAuthorsQuery,
  SearchInBooksAndAuthorsQuery,
  SearchInBooksQuery,
  SearchInSeriesQuery,
} from '__graphql/__generated__/graphql'

type SearchResultItem = NonNullable<SearchInBooksAndAuthorsQuery['search']>[number]
type AuthorSearchResult = Extract<SearchResultItem, { __typename: 'Author' }>
type BookSearchResult = Extract<SearchResultItem, { __typename: 'Book' }>

const isAuthorResult = (item: SearchResultItem): item is AuthorSearchResult => {
  return item.__typename === 'Author'
}

const isBookResult = (item: SearchResultItem): item is BookSearchResult => {
  return item.__typename === 'Book'
}

export const checkTypesTitle = (item: SearchResultItem) => {
  if (isAuthorResult(item)) {
    return `${item.name} ${item.surname}`
  }
  if (isBookResult(item)) {
    return item.title
  }
  return ''
}

export const checkTypesFormTitle = (
  item:
    | SearchInAuthorsQuery['authors'][number]
    | SearchInSeriesQuery['series'][number]
    | SearchInBooksQuery['books'][number],
) => {
  if ('name' in item) {
    return `${item.name} ${item.surname || ''}`.trim()
  }

  if ('title' in item && 'author' in item) {
    return `${item.title} — ${item.author.name} ${item.author.surname || ''}`.trim()
  }

  if ('title' in item) {
    return item.title
  }

  return ''
}

export const checkTypesRoute = (item: SearchResultItem) => {
  if (isAuthorResult(item)) {
    return 'authors'
  }
  if (isBookResult(item)) {
    return 'books'
  }
  return ''
}

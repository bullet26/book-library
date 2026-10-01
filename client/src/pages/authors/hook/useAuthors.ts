import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { useNavigate } from 'react-router-dom'
import { ALL_AUTHORS, ALL_AUTHORS_BY_BOOKS_COUNT } from '__graphql'
import type { MenuProps } from 'antd'

export enum SortOptions {
  bookCount = 'bookCount',
  surname = 'surname',
}

export const useAuthors = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('perpage')) || 50
  const sortBy = searchParams.get('sortBy') || SortOptions.surname

  const {
    loading: loadingSurname,
    error: errorSurname,
    data: dataSurname,
  } = useQuery(ALL_AUTHORS, {
    skip: sortBy !== SortOptions.surname,
    variables: { page, limit },
  })

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
  } = useQuery(ALL_AUTHORS_BY_BOOKS_COUNT, {
    skip: sortBy !== SortOptions.bookCount,
    variables: { page, limit },
  })

  const handleSortChange = (newSortBy: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sortBy', newSortBy)
      next.set('page', '1')
      return next
    })
  }

  const handlePagination = (current: number, pageSize: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(current))
      next.set('perpage', String(pageSize))
      return next
    })
  }

  const handleClickCard = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  const isBookCount = sortBy === SortOptions.bookCount
  const loading = isBookCount ? loadingCount : loadingSurname
  const error = isBookCount ? errorCount : errorSurname

  const rawAuthors = isBookCount
    ? dataCount?.getAllAuthorsByBooksCount?.authors
    : dataSurname?.getAllAuthors?.authors

  const totalCount = isBookCount
    ? dataCount?.getAllAuthorsByBooksCount?.totalCount
    : dataSurname?.getAllAuthors?.totalCount

  return {
    authors: rawAuthors || [],
    totalCount: totalCount || 0,
    loading,
    error: error?.message,
    page,
    limit,
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  }
}

export const sortItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Sort by',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: SortOptions.bookCount,
    label: 'By book count',
    extra: '⌘B',
  },
  {
    key: SortOptions.surname,
    label: 'By last name',
    extra: '⌘P',
  },
]

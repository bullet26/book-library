import { useNavigate, useSearchParams } from 'react-router-dom'
import { BookSortBy } from '__graphql/__generated__/enums'
import { ALL_BOOKS } from '__graphql'
import { useQuery } from '@apollo/client/react'

export const useBooks = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('perpage')) || 50
  const sortBy = (searchParams.get('sortBy') as BookSortBy) || BookSortBy.DateDesc

  const tagId = searchParams.get('tagId')
  const rating = searchParams.get('rating')
  const year = searchParams.get('year')

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      page,
      limit,
      filter: {
        ...(tagId && { tagId }),
        ...(rating && { rating: Number(rating) }),
        ...(year && { year: Number(year) }),
      },
      sort: sortBy,
    },
  })

  const books = data?.getBooks?.books || []
  const totalCount = data?.getBooks?.totalCount || 0

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
      navigate(`/books/${id}`)
    }
  }

  return {
    books,
    totalCount,
    loading,
    error: error?.message,
    page,
    limit,
    handleClickCard,
    handlePagination,
  }
}

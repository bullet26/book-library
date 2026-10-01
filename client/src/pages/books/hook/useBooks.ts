import { useNavigate, useSearchParams } from 'react-router-dom'
import { BookSortBy } from '__graphql/__generated__/enums'
import { ALL_BOOKS } from '__graphql'
import { useQuery } from '@apollo/client/react'

export const useBooks = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('perpage')) || 50
  const sortBy = searchParams.get('sortBy') || BookSortBy.DateDesc

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const books = data?.getBooks?.books || []
  const totalCount = data?.getBooks?.totalCount || 0

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
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  }
}

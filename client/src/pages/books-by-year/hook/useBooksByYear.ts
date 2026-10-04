import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookSortBy } from '__graphql/__generated__/enums'
import { ALL_BOOKS } from '__graphql'
import { useQuery } from '@apollo/client/react'
import type { AllBooks } from 'types'

export interface MonthGroup {
  month: string
  books: AllBooks
}

export const useBooksByYear = () => {
  const navigate = useNavigate()

  const { year } = useParams()

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    skip: !year,
    variables: {
      page: 1,
      limit: 100,
      filter: { year: Number(year) },
      sort: BookSortBy.DateAsc,
    },
  })

  const books = useMemo<MonthGroup[]>(() => {
    const booksData = data?.getBooks?.books
    if (!booksData || !year) return []

    const groupsMap = new Map<string, AllBooks>()

    booksData.forEach((item) => {
      const date = item.readDate.find(({ readEnd }) => readEnd.year.toString() === year.toString())
      if (!date) return

      const month = date.readEnd?.month
      if (!month) return

      const currentList = groupsMap.get(month) ?? []

      groupsMap.set(month, [...currentList, item])
    })

    return Array.from(groupsMap.entries()).map(([month, books]) => ({
      month,
      books,
    }))
  }, [data?.getBooks?.books])

  const handleClickCard = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  return {
    books,
    year,
    loading,
    error: error?.message,
    handleClickCard,
  }
}

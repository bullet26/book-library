import { useQuery } from '@apollo/client/react'
import { useSearchParams } from 'react-router-dom'
import { ALL_TAGS, READ_STATISTIC } from '__graphql'
import type { BookFilterInput } from '__graphql/__generated__/graphql'
import { BookSortBy } from '__graphql/__generated__/enums'

export const bookSortByLabels: { [key in BookSortBy]: string } = {
  [BookSortBy.AuthorAsc]: 'Author (A-Z)',
  [BookSortBy.AuthorDesc]: 'Author (Z-A)',
  [BookSortBy.DateAsc]: 'Date (Oldest First)',
  [BookSortBy.DateDesc]: 'Date (Newest First)',
  [BookSortBy.RatingAsc]: 'Rating (Lowest First)',
  [BookSortBy.RatingDesc]: 'Rating (Highest First)',
  [BookSortBy.TitleAsc]: 'Title (A-Z)',
  [BookSortBy.TitleDesc]: 'Title (Z-A)',
}

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTag = searchParams.get('tagId')
  const selectedRating = searchParams.get('rating')
  const selectedYear = searchParams.get('year')
  const sortBy = (searchParams.get('sortBy') as BookSortBy) || BookSortBy.DateDesc

  const { data: tags, error: tagError } = useQuery(ALL_TAGS, {})

  const { data: years, error: yearsError } = useQuery(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  })

  const handleFilterChange = (filter: keyof BookFilterInput, value: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      if (value) {
        next.set(filter, value)
      } else {
        next.delete(filter)
      }

      next.set('page', '1')
      return next
    })
  }

  const handleSortChange = (newSortBy: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sortBy', newSortBy)
      next.set('page', '1')
      return next
    })
  }

  const resetFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('tagId')
      next.delete('rating')
      next.delete('year')
      next.set('sortBy', BookSortBy.DateDesc)
      next.set('page', '1')
      return next
    })
  }

  return {
    tags: tags?.tags || [],
    years: years?.statistic || [],
    error: [...(tagError?.message || []), ...(yearsError?.message || [])].join(', '),
    selectedTag,
    selectedRating,
    selectedYear,
    sortBy,
    resetFilters,
    handleFilterChange,
    handleSortChange,
  }
}

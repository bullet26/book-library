import { useQuery } from '@apollo/client/react'
import { useSearchParams } from 'react-router-dom'
import { ALL_TAGS, READ_STATISTIC } from '__graphql'
import type { BookFilterInput } from '__graphql/__generated__/graphql'
import { BookSortBy } from '__graphql/__generated__/enums'
import { Grid } from 'antd'
import { useCallback, useEffect, useState } from 'react'

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

const { useBreakpoint } = Grid

export const useFilters = () => {
  const screens = useBreakpoint()
  const isDesktop = !!screens.md

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTag = searchParams.get('tagId')
  const selectedRating = searchParams.get('rating')
  const selectedYear = searchParams.get('year')
  const sortBy = (searchParams.get('sortBy') as BookSortBy) || BookSortBy.DateDesc

  const [draftMobileFilters, setDraftMobileFilters] = useState({
    tagId: selectedTag ?? null,
    rating: selectedRating ?? null,
    year: selectedYear ?? null,
    sortBy: sortBy,
  })

  useEffect(() => {
    if (!isDesktop) {
      setDraftMobileFilters({
        tagId: selectedTag,
        rating: selectedRating,
        year: selectedYear,
        sortBy: sortBy,
      })
    }
  }, [selectedTag, selectedRating, selectedYear, sortBy, isDesktop])

  const { data: tags, error: tagError } = useQuery(ALL_TAGS, {})

  const { data: years, error: yearsError } = useQuery(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  })

  const updateSearchParams = (paramsToUpdate: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      Object.entries(paramsToUpdate).forEach(([key, val]) => {
        if (val) {
          next.set(key, val)
        } else {
          next.delete(key)
        }
      })

      next.set('page', '1')
      return next
    })
  }

  const handleFilterChange = useCallback(
    (filter: keyof BookFilterInput | 'sortBy', value: string | null) => {
      if (isDesktop) {
        updateSearchParams({ [filter]: value })
      } else {
        setDraftMobileFilters((prev) => ({ ...prev, [filter]: value }))
      }
    },
    [isDesktop],
  )

  const resetFilters = () => {
    const defaultFilters = {
      tagId: null,
      rating: null,
      year: null,
      sortBy: BookSortBy.DateDesc,
    }

    setDraftMobileFilters(defaultFilters)
    updateSearchParams(defaultFilters)
  }

  const applyFilters = () => {
    updateSearchParams(draftMobileFilters)
  }

  return {
    tags: tags?.tags || [],
    years: years?.statistic || [],
    error: [tagError?.message, yearsError?.message].filter(Boolean).join(', '),
    selectedTag: isDesktop ? selectedTag : draftMobileFilters.tagId,
    selectedRating: isDesktop ? selectedRating : draftMobileFilters.rating,
    selectedYear: isDesktop ? selectedYear : draftMobileFilters.year,
    sortBy: isDesktop ? sortBy : draftMobileFilters.sortBy,
    resetFilters,
    handleFilterChange,
    applyFilters,
    isDesktop,
  }
}

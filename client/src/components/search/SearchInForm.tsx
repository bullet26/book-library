import { type CSSProperties, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_IN_AUTHORS, SEARCH_IN_SERIES, SEARCH_IN_BOOKS } from '__graphql'
import { useDebounce } from 'hooks'
import { Error } from 'UI'
import { SearchInputForm, SearchListForm } from 'components/search/elements'
import s from './Search.module.scss'

interface SearchInForProps {
  style?: CSSProperties
  name: 'authorID' | 'seriesID' | 'bookID'
  value?: string
  onChange: (v: string) => void
  status?: 'error'
}

const SEARCH_CONFIG = {
  authorID: { query: SEARCH_IN_AUTHORS, dataKey: 'authors', placeholder: 'Author' },
  seriesID: { query: SEARCH_IN_SERIES, dataKey: 'series', placeholder: 'Book series' },
  bookID: { query: SEARCH_IN_BOOKS, dataKey: 'books', placeholder: 'Book title' },
} as const

export const SearchInForm = (props: SearchInForProps) => {
  const { style, name, value, onChange, status } = props
  const config = SEARCH_CONFIG[name]

  const [makeSearch, { error, data }] = useLazyQuery(config.query)

  const [inputValue, setInputValue] = useState('')
  const [allowSearch, setAllowSearchStatus] = useState(false)
  const [showSearchList, setShowSearchListStatus] = useState(false)

  const debouncedValue = useDebounce(inputValue, 500)

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString: searchString.trim() } })
    setShowSearchListStatus(true)
  }

  useEffect(() => {
    if (debouncedValue && allowSearch) {
      handleSearch(inputValue)
    } else if (!debouncedValue) {
      setShowSearchListStatus(false)
    }
  }, [debouncedValue])

  useEffect(() => {
    if (!value) {
      setInputValue('')
      setAllowSearchStatus(false)
      setShowSearchListStatus(false)
    }
  }, [value])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setAllowSearchStatus(true)
  }

  const handleSearchResultClick = (id: string, value: string) => {
    onChange(id)

    setShowSearchListStatus(false)
    setAllowSearchStatus(false)
    setInputValue(value)
  }

  const listData = data ? (data as Record<typeof config.dataKey, any>)[config.dataKey] : null

  return (
    <>
      <div className={s.searchFormInputWrapper} style={style}>
        <div>
          <SearchInputForm
            placeholder={config.placeholder}
            inputValue={inputValue}
            handleChange={handleInputChange}
            style={{ ...(status === 'error' && { border: '1px solid red' }) }}
          />
        </div>

        {!!listData && showSearchList && (
          <SearchListForm data={listData} onClick={handleSearchResultClick} />
        )}
      </div>
      {!!error && <Error message={error?.message} />}
    </>
  )
}

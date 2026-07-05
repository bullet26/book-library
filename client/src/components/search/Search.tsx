import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_IN_BOOKS_AND_AUTHORS } from '__graphql/search'
import { useDebounce } from 'hooks'
import { Error } from 'UI'
import { SearchInput, SearchList } from 'components/search/elements'
import s from './Search.module.scss'

export interface DOMRectCoords {
  top: number
  left: number
  width: number
}

interface SearchProps {
  showMobileSearch: boolean
  handleMobileSearchClick: () => void
}

export const Search = (props: SearchProps) => {
  const { showMobileSearch, handleMobileSearchClick } = props

  const [makeSearch, { error, data }] = useLazyQuery(SEARCH_IN_BOOKS_AND_AUTHORS)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLDivElement>(null)

  const [showSearchList, setShowSearchListStatus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [coords, setCoords] = useState<DOMRectCoords>({ top: 0, left: 0, width: 0 })

  const debouncedValue = useDebounce(inputValue, 500)

  const updatePosition = (): void => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      })
    }
  }

  const handleSearch = (searchString: string) => {
    const trimmedSearchString = searchString.trim()

    makeSearch({ variables: { searchString: trimmedSearchString } })
    setShowSearchListStatus(true)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleSearchResultClick = (id: string, parent: string) => {
    if (!!id) navigate(`/${parent}/${id}`)

    setShowSearchListStatus(false)
    setInputValue('')
  }

  const hideSearchResultList = () => {
    setInputValue('')
    setShowSearchListStatus(false)
  }

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue)
    } else {
      setShowSearchListStatus(false)
    }
  }, [debouncedValue])

  useEffect(() => {
    if (showSearchList) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
    }

    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [showSearchList])

  return (
    <div className={s.searchWrapper} style={{ ...(showMobileSearch && { width: '100%' }) }}>
      <div ref={inputRef}>
        <SearchInput
          inputValue={inputValue}
          onChange={handleInputChange}
          showMobileSearch={showMobileSearch}
          handleMobileSearchClick={handleMobileSearchClick}
        />
      </div>
      {showSearchList && data && (
        <SearchList
          data={data?.search || []}
          onClick={handleSearchResultClick}
          handleClickOutside={hideSearchResultList}
          style={{ top: coords.top + 5, left: coords.left, width: coords.width }}
        />
      )}
      {!!error && <Error message={error?.message} />}
    </div>
  )
}

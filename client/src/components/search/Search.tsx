import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_IN_BOOKS_AND_AUTHORS } from '__graphql/search'
import { SearchInput, SearchList, Error } from 'UI'
import { useDebounce } from 'hooks/useDebounce'

export const Search = () => {
  const [makeSearch, { error, data }] = useLazyQuery(SEARCH_IN_BOOKS_AND_AUTHORS)
  const windowWidth = window.innerWidth
  const navigate = useNavigate()

  const [showSearchList, setShowSearchListStatus] = useState(false)
  const [showInputStatus, setShowInputStatus] = useState(windowWidth > 650)
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 500)

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString } })
    setShowSearchListStatus(true)
  }

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue)
    }
  }, [debouncedValue])

  const handleIconClick = () => {
    setShowInputStatus((prevState) => !prevState)
    setInputValue('')
    setShowSearchListStatus(false)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleSearchResultClick = (id: string, parent: string) => {
    !!id && navigate(`/${parent}/${id}`)

    windowWidth < 650 && setShowInputStatus(false)
    setShowSearchListStatus(false)
    setInputValue('')
  }

  const hideSearchResultList = () => {
    setInputValue('')
    setShowSearchListStatus(false)
  }

  return (
    <div>
      <SearchInput
        inputValue={inputValue}
        showInputStatus={showInputStatus}
        onIconClick={handleIconClick}
        onChange={handleInputChange}
      />
      {!!data && showSearchList && (
        <SearchList
          data={data.search}
          onClick={handleSearchResultClick}
          handleWrapperClick={hideSearchResultList}
        />
      )}
      {!!error && <Error message={error?.message} />}
    </div>
  )
}

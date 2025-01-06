/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_IN_BOOKS_AND_AUTHORS } from 'apollo/search'
import { Search as ISearch } from 'types'
import { SearchInput, SearchList, Error } from 'UI'

interface ISearchSuccess {
  search: ISearch[]
}

const Search: FC = () => {
  const [makeSearch, { error, data }] = useLazyQuery<ISearchSuccess>(SEARCH_IN_BOOKS_AND_AUTHORS)
  const windowWidth = window.innerWidth
  const navigate = useNavigate()

  const [showSearchList, setShowSearchListStatus] = useState(false)
  const [showInputStatus, setShowInputStatus] = useState(windowWidth > 650)
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString } })
    setShowSearchListStatus(true)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        handleSearch(inputValue)
      }
    }, 500)
    return () => clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

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

export default Search

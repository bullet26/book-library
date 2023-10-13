/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FC, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_IN_AUTHORS, SEARCH_IN_SERIES } from 'apollo/search'
import { useFormikContext } from 'formik'
import { Series, Author } from 'types'
import { SearchInputForm, SearchListForm, Error } from 'UI'
import s from './Search.module.scss'

interface SearchInFormprops {
  type: 'authors' | 'series'
}

interface ISearchSeriesSuccess {
  series: Series[]
}

interface ISearchAuthorsSuccess {
  authors: Author[]
}

const SearchInForm: FC<SearchInFormprops> = (props) => {
  const { type } = props

  const [makeSearchAuthors, { error: authorError, data: authorsData }] =
    useLazyQuery<ISearchAuthorsSuccess>(SEARCH_IN_AUTHORS)
  const [makeSearchSeries, { error: seriesError, data: seriesData }] =
    useLazyQuery<ISearchSeriesSuccess>(SEARCH_IN_SERIES)

  const { setFieldValue } = useFormikContext()

  const [inputValue, setInputValue] = useState('')
  const [elementChoosenStatus, setElementChoosenStatus] = useState(false)
  const [showSearchList, setShowSearchListStatus] = useState(false)

  const handleSearch = (searchString: string) => {
    if (type === 'authors') {
      makeSearchAuthors({ variables: { searchString } })
    } else if (type === 'series') {
      makeSearchSeries({ variables: { searchString } })
    }
    setShowSearchListStatus(true)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setElementChoosenStatus(false)
    if (!value) {
      setShowSearchListStatus(false)
    }
  }

  const handleSearchResultClick = (id: string, value: string) => {
    setShowSearchListStatus(false)
    if (type === 'authors') {
      setFieldValue('authorID', id)
    } else if (type === 'series') {
      setFieldValue('seriesID', id)
    }

    setElementChoosenStatus(true)
    setInputValue(value)
  }

  return (
    <>
      {type === 'authors' && (
        <div className={s.inputWrapper}>
          <SearchInputForm
            placeholder="Author"
            name="author"
            status={elementChoosenStatus}
            onSearch={handleSearch}
            inputValue={inputValue}
            handleChange={handleInputChange}
          />
          <input type="hidden" name="authorID" />
          {!!authorsData && showSearchList && (
            <SearchListForm data={authorsData.authors} onClick={handleSearchResultClick} />
          )}
        </div>
      )}

      {type === 'series' && (
        <div className={s.inputWrapper}>
          <SearchInputForm
            placeholder="Book series"
            name="series"
            status={elementChoosenStatus}
            onSearch={handleSearch}
            inputValue={inputValue}
            handleChange={handleInputChange}
          />
          <input type="hidden" name="seriesID" />
          {!!seriesData && showSearchList && (
            <SearchListForm data={seriesData.series} onClick={handleSearchResultClick} />
          )}
        </div>
      )}

      {type === 'authors' && !!authorError && <Error message={authorError?.message} />}
      {type === 'series' && !!seriesError && <Error message={seriesError?.message} />}
    </>
  )
}

export default SearchInForm

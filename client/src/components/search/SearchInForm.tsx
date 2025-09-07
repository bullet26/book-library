import { type CSSProperties, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_IN_AUTHORS, SEARCH_IN_SERIES, SEARCH_IN_BOOKS } from '__graphql'
import { useFormikContext } from 'formik'
import { SearchInputForm, SearchListForm, Error } from 'UI'
import s from './Search.module.scss'
import { useDebounce } from 'hooks/useDebounce'

interface SearchInForProps {
  type: 'authors' | 'series' | 'books'
  style?: CSSProperties
}

export const SearchInForm = (props: SearchInForProps) => {
  const { type, style } = props

  const [makeSearchAuthors, { error: authorError, data: authorsData }] =
    useLazyQuery(SEARCH_IN_AUTHORS)
  const [makeSearchSeries, { error: seriesError, data: seriesData }] =
    useLazyQuery(SEARCH_IN_SERIES)
  const [makeSearchBooks, { error: booksError, data: booksData }] = useLazyQuery(SEARCH_IN_BOOKS)

  const { setFieldValue } = useFormikContext()

  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 500)

  const [elementChosenStatus, setElementChosenStatus] = useState(false)
  const [showSearchList, setShowSearchListStatus] = useState(false)

  const handleSearch = (searchString: string) => {
    if (type === 'authors') {
      makeSearchAuthors({ variables: { searchString } })
    } else if (type === 'series') {
      makeSearchSeries({ variables: { searchString } })
    } else if (type === 'books') {
      makeSearchBooks({ variables: { searchString } })
    }
    setShowSearchListStatus(true)
  }

  useEffect(() => {
    if (!elementChosenStatus && debouncedValue) {
      handleSearch(inputValue)
    }
  }, [debouncedValue, elementChosenStatus])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setElementChosenStatus(false)
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
    } else if (type === 'books') {
      setFieldValue('bookID', id)
    }

    setElementChosenStatus(true)
    setInputValue(value)
  }

  return (
    <>
      {type === 'authors' && (
        <div className={s.inputWrapper} style={style}>
          <SearchInputForm
            placeholder="Author"
            name="author"
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
        <div className={s.inputWrapper} style={style}>
          <SearchInputForm
            placeholder="Book series"
            name="series"
            inputValue={inputValue}
            handleChange={handleInputChange}
          />
          <input type="hidden" name="seriesID" />
          {!!seriesData && showSearchList && (
            <SearchListForm data={seriesData.series} onClick={handleSearchResultClick} />
          )}
        </div>
      )}

      {type === 'books' && (
        <div className={s.inputWrapperBooks} style={style}>
          <SearchInputForm
            placeholder="Book title"
            name="title"
            inputValue={inputValue}
            handleChange={handleInputChange}
          />
          <input type="hidden" name="bookID" />
          {!!booksData && showSearchList && (
            <SearchListForm
              data={booksData.books}
              onClick={handleSearchResultClick}
              // eslint-disable-next-line react/jsx-boolean-value
              fullWidth={true}
            />
          )}
        </div>
      )}

      {type === 'authors' && !!authorError && <Error message={authorError?.message} />}
      {type === 'series' && !!seriesError && <Error message={seriesError?.message} />}
      {type === 'books' && !!booksError && <Error message={booksError?.message} />}
    </>
  )
}

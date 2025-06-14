/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CSSProperties, FC, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_IN_AUTHORS, SEARCH_IN_SERIES, SEARCH_IN_BOOKS } from 'apollo'
import { useFormikContext } from 'formik'
import { Series, Author, Book } from 'types'
import { SearchInputForm, SearchListForm, Error } from 'UI'
import s from './Search.module.scss'

interface SearchInForProps {
  type: 'authors' | 'series' | 'books'
  style?: CSSProperties
}

interface ISearchSeriesSuccess {
  series: Series[]
}

interface ISearchAuthorsSuccess {
  authors: Author[]
}

interface ISearchBooksSuccess {
  books: Book[]
}

const SearchInForm: FC<SearchInForProps> = (props) => {
  const { type, style } = props

  const [makeSearchAuthors, { error: authorError, data: authorsData }] =
    useLazyQuery<ISearchAuthorsSuccess>(SEARCH_IN_AUTHORS)
  const [makeSearchSeries, { error: seriesError, data: seriesData }] =
    useLazyQuery<ISearchSeriesSuccess>(SEARCH_IN_SERIES)
  const [makeSearchBooks, { error: booksError, data: booksData }] =
    useLazyQuery<ISearchBooksSuccess>(SEARCH_IN_BOOKS)

  const { setFieldValue } = useFormikContext()

  const [inputValue, setInputValue] = useState('')
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
    let debounce: NodeJS.Timeout | undefined
    if (!elementChosenStatus) {
      debounce = setTimeout(() => {
        if (inputValue) {
          handleSearch(inputValue)
        }
      }, 500)
    }

    return () => clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, elementChosenStatus])

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

export default SearchInForm

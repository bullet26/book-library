import { FC } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_IN_BOOKS_AND_AUTHORS } from 'apollo/search'
import { Search as ISearch } from 'types'
import { SearchInput, SearchList } from 'UI'
import s from './Search.module.scss'

interface ISearchSuccess {
  search: ISearch[]
}

const Search: FC = () => {
  const [makeSearch, { loading, error, data }] = useLazyQuery<ISearchSuccess>(
    SEARCH_IN_BOOKS_AND_AUTHORS,
  )
  console.log(data)

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString } })
  }

  return (
    <div className={s.wrapper}>
      <SearchInput onSearch={handleSearch} />
      {!!data && <SearchList data={data.search} />}
    </div>
  )
}

export default Search

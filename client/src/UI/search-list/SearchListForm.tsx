import { FC } from 'react'
import { SearchCard } from 'UI'
import { Author, Series, Book } from 'types'
import { checkTypesFormTitle } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: Author[] | Series[] | Book[]
  onClick: (id: string, value: string) => void
}

// eslint-disable-next-line react/display-name
const SearchListForm: FC<SearchListProps> = (props) => {
  const { data = [], onClick } = props

  return (
    <div className={s.formCardList}>
      {data.map((item) => (
        <SearchCard
          key={item.id}
          id={item.id}
          title={checkTypesFormTitle(item)}
          onClick={onClick}
        />
      ))}
      {!data.length && <SearchCard title="Сouldn't find anything" />}
    </div>
  )
}

export default SearchListForm

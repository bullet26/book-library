import { FC } from 'react'
import { SearchCard } from 'UI'
import { Author, Series, Book } from 'types'
import { checkTypesFormTitle } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: Author[] | Series[] | Book[]
  fullWidth?: false
  onClick: (id: string, value: string) => void
}

// eslint-disable-next-line react/display-name
const SearchListForm: FC<SearchListProps> = (props) => {
  const { data = [], onClick, fullWidth } = props

  const className = fullWidth ? [s.formCardList, s.formCardListFullWidth].join(' ') : s.formCardList

  return (
    <div className={className}>
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

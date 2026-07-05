import type {
  SearchInAuthorsQuery,
  SearchInBooksQuery,
  SearchInSeriesQuery,
} from '__graphql/__generated__/graphql'
import { SearchCard } from './SearchCard'
import { checkTypesFormTitle } from './utils'
import s from './SearchCard.module.scss'
import type { CSSProperties } from 'react'

interface SearchListProps {
  data:
    SearchInAuthorsQuery['authors'] | SearchInSeriesQuery['series'] | SearchInBooksQuery['books']
  style?: CSSProperties
  onClick: (id: string, value: string) => void
}

export const SearchListForm = (props: SearchListProps) => {
  const { data = [], onClick, style } = props

  return (
    <div className={s.formCardList} style={style}>
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

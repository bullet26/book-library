import { SearchCard } from 'UI'
import { type Author, type Series, type Book } from '__graphql/__generated__/graphql'
import { checkTypesFormTitle } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: Author[] | Series[] | Book[]
  fullWidth?: boolean
  onClick: (id: string, value: string) => void
}

export const SearchListForm = (props: SearchListProps) => {
  const { data = [], onClick, fullWidth = false } = props

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

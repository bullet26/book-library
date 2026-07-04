import { type CSSProperties } from 'react'
import { type SearchInBooksAndAuthorsQuery } from '__graphql/__generated__/graphql'
import { SearchCard } from './SearchCard'
import { checkTypesTitle, checkTypesRoute } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data: SearchInBooksAndAuthorsQuery['search']
  onClick: (id: string, parent: string) => void
  handleClickOutside: () => void
  style?: CSSProperties
}

export const SearchList = (props: SearchListProps) => {
  const { data = [], onClick, handleClickOutside, style } = props

  return (
    <div className={s.searchListMask} onClick={handleClickOutside}>
      <div className={s.searchListWrapper} style={style}>
        {data.map((item) => (
          <SearchCard
            key={item.id}
            id={item.id}
            title={checkTypesTitle(item)}
            onClick={onClick}
            parent={checkTypesRoute(item)}
          />
        ))}
        {!data.length && <SearchCard title="Сouldn't find anything" />}
      </div>
    </div>
  )
}

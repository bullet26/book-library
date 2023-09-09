import { FC, useRef, useEffect } from 'react'
import { SearchCard } from 'UI'
import { Search as ISearch } from 'types'
import { checkTypesTitle, checkTypesRoute } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: ISearch[]
  onClick: (id: string, parent: string) => void
  handleWrapperClick: () => void
}

// eslint-disable-next-line react/display-name
const SearchList: FC<SearchListProps> = (props) => {
  const { data = [], onClick, handleWrapperClick } = props
  const listRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === listRef?.current) {
        handleWrapperClick()
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [handleWrapperClick])

  return (
    <div className={s.wrapper} ref={listRef}>
      <div className={s.cardList}>
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

export default SearchList

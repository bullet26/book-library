import { useRef, useEffect, type CSSProperties } from 'react'
import { SearchCard } from 'UI'
import { type Search as ISearch } from 'types'
import { checkTypesTitle, checkTypesRoute } from './utils'
import s from './SearchCard.module.scss'

interface SearchListProps {
  data?: ISearch[]
  onClick: (id: string, parent: string) => void
  handleWrapperClick: () => void
  style?: CSSProperties
}

export const SearchList = (props: SearchListProps) => {
  const { data = [], onClick, handleWrapperClick, style } = props
  const listRef = useRef(null)
  const hasScrollbar = document.body.offsetHeight > window.innerHeight

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | Event) => {
      if (e.target === listRef?.current || window.scrollY > 20) {
        handleWrapperClick()
      }
    }
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [handleWrapperClick])

  return (
    <div className={s.wrapper} ref={listRef}>
      <div className={`${s.cardList} ${hasScrollbar && s.withScrollbar}`} style={style}>
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

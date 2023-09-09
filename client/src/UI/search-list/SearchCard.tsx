import { FC } from 'react'
import s from './SearchCard.module.scss'

interface SearchCardProps {
  title: string
  id?: string
  parent?: string
  onClick?: (id: string, parent: string) => void
}

const SearchCard: FC<SearchCardProps> = (props) => {
  const { title, onClick = () => {}, parent = '', id = '' } = props

  return (
    <div className={s.card} onClick={() => onClick(id, parent)}>
      {title}
    </div>
  )
}

export default SearchCard

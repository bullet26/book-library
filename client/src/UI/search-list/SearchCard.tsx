import { FC } from 'react'
import s from './SearchCard.module.scss'

interface SearchCardProps {
  title: string
  id?: string
  onClick: (id: string) => void
}

const SearchCard: FC<SearchCardProps> = (props) => {
  const { title, onClick, id = '' } = props

  return (
    <div className={s.card} onClick={() => onClick(id)}>
      {title}
    </div>
  )
}

export default SearchCard

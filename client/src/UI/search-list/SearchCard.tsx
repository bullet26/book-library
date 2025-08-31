import s from './SearchCard.module.scss'

interface SearchCardProps {
  title: string
  id?: string
  parent?: string
  onClick?: (id: string, parent: string) => void
}

export const SearchCard = (props: SearchCardProps) => {
  const { title, onClick = () => {}, parent = '', id = '' } = props

  return (
    <div className={s.card} onClick={() => onClick(id, parent || title)}>
      {title}
    </div>
  )
}

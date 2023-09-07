import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { Author } from 'types'
import s from './CardList.module.scss'

interface CardListAuthorsProps {
  data: Author[]
}

const CardListAuthors: FC<CardListAuthorsProps> = (props) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`${id}`)
    }
  }

  return (
    <div className={s.wrpper}>
      {data?.map(({ id, surname, name, portrait }) => (
        <Card
          key={id}
          id={id}
          img={portrait}
          title={surname}
          subtitle={name}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CardListAuthors

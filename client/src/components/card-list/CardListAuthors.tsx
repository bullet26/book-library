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
      navigate(`/authors/${id}`)
    }
  }

  return (
    <div className={s.wrapper}>
      {data?.map(({ id, surname, name, portraitThumbnail }) => (
        <Card
          key={id}
          id={id}
          img={portraitThumbnail}
          title={surname}
          subtitle={name}
          onClick={handleClick}
          type="author"
        />
      ))}
    </div>
  )
}

export default CardListAuthors

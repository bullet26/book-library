import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { Author, MostRededAuthorResponse } from 'types'
import s from './CardList.module.scss'

interface CardListAuthorsProps {
  data: Author[] | MostRededAuthorResponse[]
}

const isMostRededAuthorResponse = (
  item: Author | MostRededAuthorResponse,
): item is MostRededAuthorResponse => {
  return (item as MostRededAuthorResponse).count !== undefined
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
      {data?.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          img={item.portraitThumbnail}
          title={item.surname}
          subtitle={item.name}
          count={isMostRededAuthorResponse(item) ? item.count : 0}
          onClick={handleClick}
          type="author"
        />
      ))}
    </div>
  )
}

export default CardListAuthors

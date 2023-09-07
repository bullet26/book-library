import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { ReadDateBook } from 'types'
import s from './CardList.module.scss'

interface CardListBooksByDateProps {
  data: ReadDateBook[]
}

const CardListBooksByDate: FC<CardListBooksByDateProps> = (props) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`${id}`)
    }
  }

  return (
    <div className={s.wrpper}>
      {data?.map(({ id, books }, i) => (
        <Card
          key={books.id}
          id={books.id}
          img={books.bookCover}
          title={books.title}
          subtitle={`${books.author.name} ${books.author.surname}`}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CardListBooksByDate

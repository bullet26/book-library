import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { ReadDateBook } from 'types'
import s from './CardList.module.scss'

interface CardListBooksProps {
  data: ReadDateBook[]
}

const CardListBooks: FC<CardListBooksProps> = (props) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  return (
    <div className={s.wrpper}>
      {data?.map(({ id, books }) => (
        <Card
          key={id}
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

export default CardListBooks

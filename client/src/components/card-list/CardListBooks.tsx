import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { ReadDateBook, Book } from 'types'
import s from './CardList.module.scss'

interface CardListBooksProps {
  data: ReadDateBook[] | Book[]
  typeData: 'readDate' | 'tag'
}

const CardListBooks: FC<CardListBooksProps> = (props) => {
  const { data, typeData } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  return (
    <div className={s.wrapper}>
      {typeData === 'readDate' &&
        (data as ReadDateBook[])?.map(({ id, books }) => (
          <Card
            key={id}
            id={books.id}
            img={books.bookCoverThumbnail}
            title={books.title}
            subtitle={`${books.author.name} ${books.author.surname}`}
            rating={books.rating}
            onClick={handleClick}
            type="book"
          />
        ))}
      {typeData === 'tag' &&
        (data as Book[])?.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            img={item.bookCoverThumbnail}
            title={item.title}
            subtitle={`${item.author.name} ${item.author.surname}`}
            rating={item.rating}
            onClick={handleClick}
            type="book"
          />
        ))}
    </div>
  )
}

export default CardListBooks

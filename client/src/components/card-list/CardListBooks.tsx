import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import type { BooksByDate, BooksByTag } from 'types/book'
import s from './CardList.module.scss'

interface CardListBooksProps {
  data: BooksByDate | BooksByTag
}

const isReadDateBook = (
  item: BooksByDate[number] | BooksByTag[number],
): item is BooksByDate[number] => {
  return 'books' in item
}

const isTagBook = (item: BooksByDate[number] | BooksByTag[number]): item is BooksByTag[number] => {
  return 'title' in item
}

export const CardListBooks = (props: CardListBooksProps) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  return (
    <div className={s.wrapper}>
      {data.map((item) => (
        <div key={item.id}>
          {isReadDateBook(item) && (
            <Card
              id={item.books.id}
              img={item.books.bookCoverThumbnail}
              title={item.books.title}
              subtitle={`${item.books.author.name} ${item.books.author.surname}`}
              rating={item.books.rating}
              onClick={handleClick}
              type="book"
            />
          )}
          {isTagBook(item) && (
            <Card
              id={item.id}
              img={item.bookCoverThumbnail}
              title={item.title}
              subtitle={`${item.author.name} ${item.author.surname}`}
              rating={item.rating}
              onClick={handleClick}
              type="book"
            />
          )}
        </div>
      ))}
    </div>
  )
}

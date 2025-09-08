import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import type { GetBooksByTagQuery } from '__graphql/__generated__/graphql'
import type { ReadDateBook } from 'types/book'
import s from './CardList.module.scss'

type TagBook = NonNullable<GetBooksByTagQuery['tagData']>['booksInTag']
interface CardListBooksProps {
  data: ReadDateBook[] | TagBook
  typeData: 'readDate' | 'tag'
}

export const CardListBooks = (props: CardListBooksProps) => {
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
        (data as ReadDateBook[]).map((item) => (
          <Card
            key={item.id}
            id={item.books.id}
            img={item.books.bookCoverThumbnail}
            title={item.books.title}
            subtitle={`${item.books.author.name} ${item.books.author.surname}`}
            rating={item.books.rating}
            onClick={handleClick}
            type="book"
          />
        ))}
      {typeData === 'tag' &&
        (data as TagBook)?.map((item) => (
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

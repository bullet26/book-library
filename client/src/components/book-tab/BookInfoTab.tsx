import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { BookInfo, Carousel } from 'components'
import { useQuery } from '@apollo/client'
import { Book as IBook } from 'types'
import { ONE_BOOK_BY_ID } from 'apollo'
import s from './BookTab.module.scss'

interface BookQuery {
  book: IBook
}

const BookInfoTab: FC = () => {
  const { id } = useParams()
  const { data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } })
  const series = data?.book.series

  return (
    <div className={s.contentWrapper}>
      <BookInfo data={data} />
      {!!series && (
        <Carousel data={series.booksInSeries} title={`All books in the series: ${series.title}`} />
      )}
    </div>
  )
}

export default BookInfoTab

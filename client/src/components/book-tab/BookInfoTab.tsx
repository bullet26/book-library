import { FC } from 'react'
import { BookInfo, Carousel } from 'components'
import { Book as IBook } from 'types'
import s from './BookTab.module.scss'

interface BookInfoTabProps {
  data?: {
    book: IBook
  }
}

const BookInfoTab: FC<BookInfoTabProps> = (props) => {
  const { data } = props

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

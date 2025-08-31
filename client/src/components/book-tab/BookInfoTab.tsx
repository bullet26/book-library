import { BookInfo, Carousel } from 'components'
import { type Book as IBook } from 'types'
import s from './BookTab.module.scss'

interface BookInfoTabProps {
  data?: {
    book: IBook
  }
}

export const BookInfoTab = (props: BookInfoTabProps) => {
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

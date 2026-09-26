import type { GetOneBookByIdQuery } from '__graphql/__generated__/graphql'
import { Carousel, BookInfo } from './elements'
import s from '../BookTab.module.scss'

interface BookInfoTabProps {
  data?: GetOneBookByIdQuery
}

export const BookInfoTab = (props: BookInfoTabProps) => {
  const { data } = props

  const series = data?.book?.series

  return (
    <div className={s.contentWrapper}>
      <BookInfo data={data} />
      {!!series?.booksInSeries && (
        <Carousel
          booksInSeries={series.booksInSeries}
          title={`All books in the series: ${series.title}`}
        />
      )}
    </div>
  )
}

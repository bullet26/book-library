import type { GetOneBookByIdQuery } from '__graphql/__generated__/graphql'
import { Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { sanitize } from 'utils'
import { Carousel } from './carousel'
import s from './BookTab.module.scss'

interface BookInfoTabProps {
  data?: GetOneBookByIdQuery
}

export const BookInfoTab = (props: BookInfoTabProps) => {
  const { data } = props

  const navigate = useNavigate()

  const handleClickAuthor = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  const handleClickDate = (year?: string | number) => {
    if (year) {
      navigate(`/books/date/${year}`)
    }
  }

  const annotation = sanitize(data?.book?.description || '')

  const series = data?.book?.series

  return (
    <div className={s.contentWrapper}>
      {!!data?.book && (
        <div className={s.bookInfo}>
          <div className={s.key}>author</div>
          <Tooltip title={data?.book?.notes || null} placement="leftTop">
            <div
              className={`${s.value} ${s.link}`}
              onClick={() => handleClickAuthor(data?.book?.author.id)}>
              {data.book.author.name} {data?.book.author.surname}
            </div>
          </Tooltip>
          <div className={s.key}>read date</div>
          <div className={`${s.value} ${s.link}`}>
            {data.book.readDate.map((item, i) => (
              <div key={i} onClick={() => handleClickDate(item?.readEnd.year)}>
                {item?.readEnd.day} {item?.readEnd.month}, {item?.readEnd.year}
              </div>
            ))}
          </div>
          <div className={s.key}>description</div>
          <div className={s.value} dangerouslySetInnerHTML={{ __html: annotation }} />
        </div>
      )}
      {!!series?.booksInSeries && (
        <Carousel
          booksInSeries={series.booksInSeries}
          title={`All books in the series: ${series.title}`}
        />
      )}
    </div>
  )
}

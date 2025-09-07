import { useNavigate } from 'react-router-dom'
import type { GetOneBookByIdQuery } from '__graphql/__generated__/graphql'
import s from './BookInfo.module.scss'

interface BookInfoProps {
  data?: GetOneBookByIdQuery
}

export const BookInfo = (props: BookInfoProps) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClickAuthor = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  const handleClickDate = (year?: string) => {
    if (year) {
      navigate(`/date/${year}`)
    }
  }

  return (
    !!data?.book && (
      <div className={s.bookInfo}>
        <div className={s.key}>author</div>
        <div
          className={`${s.value} ${s.link}`}
          onClick={() => {
            handleClickAuthor(data?.book?.author.id)
          }}>
          {data.book.author.name} {data?.book.author.surname}
        </div>
        <div className={s.key}>read date</div>
        <div className={`${s.value} ${s.link}`}>
          {data.book.readDate.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  handleClickDate(item?.readEnd.year)
                }}>
                {item?.readEnd.day} {item?.readEnd.month}, {item?.readEnd.year}
              </div>
            )
          })}
        </div>
        <div className={s.key}>description</div>
        <div
          className={s.value}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: data?.book.description as TrustedHTML }}
        />
      </div>
    )
  )
}

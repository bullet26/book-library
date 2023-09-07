import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Book } from 'types'
import s from './BookInfo.module.scss'

interface BookInfoProps {
  data?: { book: Book }
}

const BookInfo: FC<BookInfoProps> = (props) => {
  const { data } = props
  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    !!id && navigate(`/authors/${id}`)
  }

  return (
    <div className={s.bookInfo}>
      <div className={s.key}>author</div>
      <div
        className={`${s.value} ${s.link}`}
        onClick={() => {
          handleClick(data?.book.author.id)
        }}>
        {data?.book.author.name} {data?.book.author.surname}
      </div>
      <div className={s.key}>read date</div>
      <div className={s.value}>
        {data?.book.readDate?.map(({ readEnd }, i) => {
          return (
            <div key={i}>
              {readEnd.day} {readEnd.month}, {readEnd.year}
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
}

export default BookInfo

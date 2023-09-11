import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Image } from 'antd'
import { Book as IBook } from 'types'
import { BookTab } from 'components'
import { Loader, Rating, ScrollArrow, Error } from 'UI'
import { Book as BookImg } from 'assets'
import { ONE_BOOK_BY_ID } from 'apollo'
import s from './Book.module.scss'

interface BookQuery {
  book: IBook
}

const Book: FC = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } })
  const bookCover = data?.book.bookCover

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <ScrollArrow />
          <div className={s.wrapperContent}>
            <div className={`${s.title} ${s.mobile}`}>{data?.book.title}</div>
            <div className={s.imgWrapper}>
              {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
              <Rating rating={data?.book.rating || 0} />
            </div>
            <div className={s.contentWrapper}>
              <div className={s.title}>{data?.book.title}</div>
              <BookTab />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Book

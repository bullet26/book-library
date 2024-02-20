import { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Image, Tag } from 'antd'
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

  const navigate = useNavigate()

  const bookCover = data?.book.bookCover

  const handleClickTag = (tagId: string) => {
    if (tagId) {
      navigate(`/tag/${tagId}`)
    }
  }

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <ScrollArrow />
          <div className={s.wrapperContent}>
            <div className={`${s.title} ${s.mobile}`}>{data?.book.title}</div>
            <div className={s.imgWrapperTagWrapper}>
              <div className={s.imgWrapper}>
                {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
                <Rating rating={data?.book.rating || 0} type="star" />
              </div>
              <div className={s.tagWrapper}>
                {data?.book?.tags.map((item) => (
                  <Tag
                    bordered={false}
                    key={item.id}
                    color="magenta"
                    onClick={() => handleClickTag(item.id)}>
                    {item.tag}
                  </Tag>
                ))}
              </div>
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

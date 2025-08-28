/* eslint-disable react/no-children-prop */
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Image } from 'antd'
import { Book as IBook } from 'types'
import { BookTab, ReactHelmetMetadata } from 'components'
import { Loader, Rating, ScrollArrow, Error, SelectTag } from 'UI'
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
  const description = data?.book.description

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <ReactHelmetMetadata
          title={data?.book.title}
          pageURL={window.location.href}
          imageURL={bookCover}
          description={description?.replace(/<[^>]*>/g, '') || data?.book.title}
          children={
            <div className={s.wrapper}>
              <ScrollArrow />
              <div className={s.wrapperContent}>
                <div className={`${s.title} ${s.mobile}`}>{data?.book.title}</div>
                <div className={s.imgWrapperTagWrapper}>
                  <div className={s.imgWrapper}>
                    {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
                    <Rating rating={data?.book.rating || 0} type="star" />
                  </div>
                  <SelectTag tags={data?.book?.tags} bookID={id} />
                </div>
                <div className={s.contentWrapper}>
                  <div className={s.title}>{data?.book.title}</div>
                  <BookTab />
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  )
}

export default Book

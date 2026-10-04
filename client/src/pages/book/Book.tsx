import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Flex, Image } from 'antd'
import { TegakiRenderer } from 'tegaki'
import caveat from 'tegaki/fonts/caveat'
import { ReactHelmetMetadata } from 'components'
import { Loader, Rating, ScrollArrow, Error } from 'UI'
import { Book as BookImg } from 'assets'
import { ONE_BOOK_BY_ID } from '__graphql'
import { BookTab } from './book-tabs'
import { Tags } from './tags'
import s from './Book.module.scss'

export const Book = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(ONE_BOOK_BY_ID, { skip: !id, variables: { id } })

  if (loading) return <Loader />
  if (error) return <Error message={error.message} />
  if (!data?.book) return null

  const { bookCover, description, title, tags, rating } = data.book

  return (
    <ReactHelmetMetadata
      title={data.book.title}
      pageURL={window.location.href}
      imageURL={bookCover || ''}
      description={(description || title).replace(/<[^>]*>/g, '')}
      children={
        <Flex justify="flex-end" gap="large">
          {window.innerWidth > 630 && <ScrollArrow />}

          <Flex justify="space-between" align="flex-start" className={s.wrapper}>
            <div className={`${s.title} ${s.mobile}`}>{title}</div>
            <Flex vertical gap="large">
              <Flex vertical gap="medium" justify="space-between" className={s.imgWrapper}>
                {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
                <Rating rating={rating || 0} type="star" />
              </Flex>
              <Tags tags={tags || []} bookID={id} />
            </Flex>

            <div className={s.contentWrapper}>
              <TegakiRenderer font={caveat} className={s.title}>
                {title}
              </TegakiRenderer>
              <BookTab />
            </div>
          </Flex>
        </Flex>
      }
    />
  )
}

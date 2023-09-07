import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { Image } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Book as BookImg } from 'assets'
import { BookSection } from 'components'
import { Loader, ScrollArrow } from 'UI'
import { Author as IAuthor } from 'types'
import { ONE_AUTHOR_BY_ID } from 'apollo'
import s from './Author.module.scss'

interface AuthorQuery {
  author: IAuthor
}

const Author: FC = () => {
  const { id: authorId } = useParams()

  const { loading, error, data } = useQuery<AuthorQuery>(ONE_AUTHOR_BY_ID, {
    variables: { id: authorId },
  })
  const series = data?.author.series
  const books = data?.author.booksWithoutSeries
  const portrait = data?.author.portrait

  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    navigate(`/books/${id}`)
  }
  console.log(data)

  return !loading ? (
    <div className={s.wrapper}>
      <ScrollArrow />
      <div className={s.wrapperContent}>
        <div
          className={`${s.title} ${s.mobile}`}>{`${data?.author.name} ${data?.author.surname}`}</div>
        <div className={s.imgWrapper}>
          {portrait ? <Image width="100%" src={portrait} alt="author" /> : <BookImg width="100%" />}
          <div className={s.title}>{`${data?.author.name} ${data?.author.surname}`}</div>
        </div>
        <div className={s.bookWrapper}>
          {!!series?.length &&
            series.map(({ title, booksInSeries }) => (
              <BookSection
                key={title}
                seriesTitle={title}
                booksInSeries={booksInSeries}
                onClick={handleClick}
              />
            ))}
          {!!books?.length && (
            <BookSection
              seriesTitle="Books outside the series"
              booksInSeries={books}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Author

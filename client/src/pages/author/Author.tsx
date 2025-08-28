/* eslint-disable react/no-children-prop */
import { FC, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { Image } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Book as BookImg, unknownAuthor1, unknownAuthor2 } from 'assets'
import { BookSection, ReactHelmetMetadata } from 'components'
import { Loader, ScrollArrow, Error } from 'UI'
import { Author as IAuthor } from 'types'
import { ONE_AUTHOR_BY_ID } from 'apollo'
import { colorRate } from 'utils'
import s from './Author.module.scss'

interface AuthorQuery {
  author: IAuthor
}

function getRandomImage() {
  const images = [unknownAuthor1, unknownAuthor2]
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

const Author: FC = () => {
  const { id: authorId } = useParams()

  const { loading, error, data } = useQuery<AuthorQuery>(ONE_AUTHOR_BY_ID, {
    variables: { id: authorId },
  })
  const series = data?.author.series
  const books = data?.author.booksWithoutSeries
  const portrait = data?.author.portrait || getRandomImage()

  const { booksQuant, booksAverageRating } = useMemo(() => {
    let booksInSeriesQuant = 0
    const booksWithoutSeriesQuant = books?.length || 0
    let booksInSeriesTotalRating = 0
    let booksWithoutSeriesTotalRating = 0

    series?.forEach(({ booksInSeries }) => {
      booksInSeriesQuant += booksInSeries?.length || 0
      booksInSeries.forEach(({ rating }) => {
        booksInSeriesTotalRating += rating
      })
    })

    books?.forEach(({ rating }) => {
      booksWithoutSeriesTotalRating += rating
    })

    const booksQuant = booksInSeriesQuant + booksWithoutSeriesQuant
    const booksAverageRating =
      Math.ceil(((booksInSeriesTotalRating + booksWithoutSeriesTotalRating) / booksQuant) * 100) /
      100

    return {
      booksQuant,
      booksAverageRating,
    }
  }, [series, books])

  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    navigate(`/books/${id}`)
  }

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <ReactHelmetMetadata
          title={`${data?.author.surname}, ${data?.author.name}`}
          pageURL={window.location.href}
          imageURL={portrait}
          description={`${data?.author.name} ${data?.author.surname}`}
          children={
            <div className={s.wrapper}>
              <ScrollArrow />
              <div className={s.wrapperContent}>
                <div
                  className={`${s.title} ${s.mobile}`}>{`${data?.author.name} ${data?.author.surname}`}</div>
                <div className={s.imgWrapper}>
                  {portrait ? (
                    <Image width="100%" src={portrait} alt="author" />
                  ) : (
                    <BookImg width="100%" />
                  )}
                  <div className={s.title}>{`${data?.author.name} ${data?.author.surname}`}</div>
                  <div className={s.statistic}>Total number of books read:&nbsp;{booksQuant}</div>
                  <div className={s.statistic}>
                    Average rating:&nbsp;
                    <span style={{ color: colorRate(booksAverageRating) }}>
                      {booksAverageRating}
                    </span>
                  </div>
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
          }
        />
      )}
    </>
  )
}

export default Author

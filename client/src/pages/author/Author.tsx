import { useQuery } from '@apollo/client/react'
import { Flex, Image } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { TegakiRenderer } from 'tegaki'
import caveat from 'tegaki/fonts/caveat'
import { Book as BookImg, unknownAuthor1, unknownAuthor2 } from 'assets'
import { ReactHelmetMetadata } from 'components'
import { Loader, ScrollArrow, Error } from 'UI'
import { ONE_AUTHOR_BY_ID } from '__graphql'
import { colorRate } from 'utils'
import { calcRating } from './utils'
import { BookSection } from './elements'
import s from './Author.module.scss'

function getRandomImage() {
  const images = [unknownAuthor1, unknownAuthor2]
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

export const Author = () => {
  const { id: authorId } = useParams()

  const { loading, error, data } = useQuery(ONE_AUTHOR_BY_ID, {
    skip: !authorId,
    variables: { id: authorId },
  })

  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    navigate(`/books/${id}`)
  }

  const { booksQuant, booksAverageRating } = calcRating(data)
  const portrait = data?.author?.portrait || getRandomImage()

  if (loading) return <Loader />
  if (error) return <Error message={error?.message} />

  return (
    !!data?.author && (
      <ReactHelmetMetadata
        title={`${data.author.surname}, ${data.author.name}`}
        pageURL={window.location.href}
        imageURL={portrait}
        description={`${data?.author.name} ${data?.author.surname}`}
        children={
          <Flex justify="flex-end">
            <ScrollArrow />
            <Flex justify="space-between" className={s.wrapperContent}>
              <div
                className={`${s.title} ${s.mobile}`}>{`${data?.author.name} ${data?.author.surname}`}</div>
              <div className={s.imgWrapper}>
                {portrait ? (
                  <Image width="100%" src={portrait} alt="author" />
                ) : (
                  <BookImg width="100%" />
                )}
                <TegakiRenderer font={caveat} className={s.title}>
                  {`${data?.author.name} ${data?.author.surname}`}
                </TegakiRenderer>
                <div className={s.statistic}>Total number of books read:&nbsp;{booksQuant}</div>
                <div className={s.statistic}>
                  Average rating:&nbsp;
                  <span style={{ color: colorRate(booksAverageRating) }}>{booksAverageRating}</span>
                </div>
              </div>
              <div className={s.bookWrapper}>
                {data.author.series.map(({ title, booksInSeries }) => (
                  <BookSection
                    key={title}
                    title={title}
                    booksInSeries={booksInSeries}
                    onClick={handleClick}
                  />
                ))}
                {!!data.author.booksWithoutSeries.length && (
                  <BookSection
                    title="Books outside the series"
                    booksInSeries={data.author.booksWithoutSeries}
                    onClick={handleClick}
                  />
                )}
              </div>
            </Flex>
          </Flex>
        }
      />
    )
  )
}

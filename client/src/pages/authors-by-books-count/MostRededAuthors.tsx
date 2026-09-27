import { useQuery } from '@apollo/client/react'
import { Loader, Error, Card } from 'UI'
import { ALL_AUTHORS_BY_BOOKS_COUNT } from '__graphql'
import { useNavigate } from 'react-router-dom'
import { getRandomImage } from 'utils'
import s from './MostRededAuthors.module.scss'

export const MostRededAuthors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS_BY_BOOKS_COUNT)

  const navigate = useNavigate()

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/authors/${id}`)
    }
  }

  const authors = data?.author

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!authors && (
        <div className={s.cardWrapper}>
          {authors?.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              img={item.portraitThumbnail || getRandomImage()}
              title={item?.surname || ''}
              subtitle={item.name}
              count={item.count}
              onClick={handleClick}
              type="author"
            />
          ))}
        </div>
      )}
    </>
  )
}

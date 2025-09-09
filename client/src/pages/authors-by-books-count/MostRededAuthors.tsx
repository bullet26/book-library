import { useQuery } from '@apollo/client/react'
import { CardListAuthors } from 'components'
import { Loader, Error } from 'UI'
import { ALL_AUTHORS_BY_BOOKS_COUNT } from '__graphql'
import s from './MostRededAuthors.module.scss'

export const MostRededAuthors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS_BY_BOOKS_COUNT)

  const authors = data?.author

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!authors && (
        <div className={s.wrapper}>
          <div className={s.innerWrapper}>
            <CardListAuthors data={authors} />
          </div>
        </div>
      )}
    </>
  )
}

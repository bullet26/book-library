import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { CardListAuthors } from 'components'
import { Loader, Error } from 'UI'
import { ALL_AUTHORS_BY_BOOKS_COUNT } from 'apollo'
import { MostRededAuthorResponse } from 'types'
import s from './MostRededAuthors.module.scss'

interface AuthorsQuery {
  author: MostRededAuthorResponse[]
}

const MostRededAuthors: FC = () => {
  const { loading, error, data } = useQuery<AuthorsQuery>(ALL_AUTHORS_BY_BOOKS_COUNT)

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <div className={s.innerWrapper}>
            <CardListAuthors data={data.author || []} />
          </div>
        </div>
      )}
    </>
  )
}

export default MostRededAuthors

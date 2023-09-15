import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { CardListBooks } from 'components'
import { Loader, Error, DateDivider } from 'UI'
import { ReadDateBook } from 'types'
import { ALL_BOOKS_BY_SPECIFIC_DATE } from 'apollo'
import s from './BooksByDate.module.scss'

interface BooksByDateQuery {
  bookInYear: ReadDateBook[]
}

const BooksByDate: FC = () => {
  const { year } = useParams()

  const { loading, error, data } = useQuery<BooksByDateQuery>(ALL_BOOKS_BY_SPECIFIC_DATE, {
    variables: {
      year: Number(year),
    },
  })

  const books = data?.bookInYear

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <DateDivider message="September" />
          <CardListBooks data={books || []} />
        </div>
      )}
    </>
  )
}

export default BooksByDate

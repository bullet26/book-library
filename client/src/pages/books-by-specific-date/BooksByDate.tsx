import { FC, Fragment, useEffect, useState } from 'react'
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

type FormattedBook = { [x: string]: ReadDateBook[] }[]

const BooksByDate: FC = () => {
  const { year } = useParams()

  const { loading, error, data } = useQuery<BooksByDateQuery>(ALL_BOOKS_BY_SPECIFIC_DATE, {
    variables: {
      year: Number(year),
    },
  })

  const [formattedBooks, setFormattedBooksState] = useState<FormattedBook>([])

  useEffect(() => {
    if (data?.bookInYear) {
      const booksData = data?.bookInYear
      let currentMonth = booksData[0].readEnd.month
      let arr: ReadDateBook[] = []
      const result: FormattedBook = []

      booksData?.forEach((item, i) => {
        if (item.readEnd.month !== currentMonth) {
          result.push({ [currentMonth]: arr })
          arr = []
          currentMonth = item.readEnd.month
        }
        arr.push(item)
        if (booksData.length - 1 === i) {
          result.push({ [currentMonth]: arr })
        }
      })
      setFormattedBooksState(result)
    }
  }, [data])

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <DateDivider message={String(year)} type="main" />
          {formattedBooks?.map((item) => {
            const currentMonth = Object.keys(item)[0]
            const books = item[currentMonth]
            return (
              <>
                <DateDivider message={currentMonth} key={currentMonth} />
                <CardListBooks data={books || []} key={books[0].id} />
              </>
            )
          })}
        </div>
      )}
    </>
  )
}

export default BooksByDate

import { FC, Fragment, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { useParams } from 'react-router-dom'
import { CardListBooks, YearSelect } from 'components'
import { Loader, Error, DateDivider, Button } from 'UI'
import { ReadDateBook } from 'types'
import { ALL_BOOKS_BY_SPECIFIC_DATE } from 'apollo'
import s from './BooksByDate.module.scss'

interface BooksByDateQuery {
  bookInYear: ReadDateBook[]
}

type FormattedBook = { [x: string]: ReadDateBook[] }[]

const BooksByDate: FC = () => {
  const { year } = useParams()
  const windowWidth = window.innerWidth

  const { loading, error, data } = useQuery<BooksByDateQuery>(ALL_BOOKS_BY_SPECIFIC_DATE, {
    variables: {
      year: Number(year),
    },
  })

  const [formattedBooks, setFormattedBooksState] = useState<FormattedBook>([])

  useEffect(() => {
    if (data?.bookInYear?.length) {
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
          <div className={s.innerWrapper}>
            <YearSelect year={year} />
            {windowWidth < 729 && <Button />}
          </div>
          <DateDivider message={String(year)} type="main" />
          {formattedBooks?.map((item) => {
            const currentMonth = Object.keys(item)[0]
            const books = item[currentMonth]
            return (
              <Fragment key={currentMonth}>
                <DateDivider message={currentMonth} />
                <CardListBooks data={books || []} typeData="readDate" />
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

export default BooksByDate

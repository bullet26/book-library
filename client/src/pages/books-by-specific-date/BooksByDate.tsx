import { Fragment, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { useNavigate, useParams } from 'react-router-dom'
import { YearSelect } from 'components'
import { Loader, Error, ActivateEditMode, Card } from 'UI'
import { ALL_BOOKS_BY_SPECIFIC_DATE } from '__graphql'
import type { ReadDateBook } from 'types'
import { DateDivider } from './elements'
import s from './BooksByDate.module.scss'

type FormattedBook = { [x: string]: ReadDateBook[] }[]

export const BooksByDate = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  const windowWidth = window.innerWidth

  const { loading, error, data } = useQuery(ALL_BOOKS_BY_SPECIFIC_DATE, {
    skip: !year,
    variables: {
      year: Number(year),
    },
  })

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

  const [formattedBooks, setFormattedBooksState] = useState<FormattedBook>([])

  useEffect(() => {
    if (data?.bookInYear?.length) {
      const booksData = data?.bookInYear
      let currentMonth = booksData[0]?.readEnd.month
      let arr: ReadDateBook[] = []
      const result: FormattedBook = []

      booksData?.forEach((item, i) => {
        if (item && item?.readEnd.month !== currentMonth) {
          result.push({ [currentMonth]: arr })
          arr = []
          currentMonth = item.readEnd.month
        }
        if (item) arr.push(item)
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
            {windowWidth < 729 && <ActivateEditMode />}
          </div>

          <DateDivider message={String(year)} type="main" />
          {formattedBooks?.map((item) => {
            const currentMonth = Object.keys(item)[0]
            const books = item[currentMonth]
            return (
              <Fragment key={currentMonth}>
                <DateDivider message={currentMonth} />
                <div className={s.cardWrapper}>
                  {books &&
                    books.map((item) => (
                      <Card
                        id={item.books.id}
                        img={item.books.bookCoverThumbnail}
                        title={item.books.title}
                        subtitle={`${item.books.author.name} ${item.books.author.surname}`}
                        rating={item.books.rating}
                        onClick={handleClick}
                        type="book"
                      />
                    ))}
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

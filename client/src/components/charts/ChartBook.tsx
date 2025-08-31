import { useEffect, useState } from 'react'
import { MOST_READ_BOOKS } from 'apollo'
import { useQuery } from '@apollo/client/react'
import { DiagramPie } from 'components'
import { Error } from 'UI'
import s from './Chart.module.scss'

interface IBook {
  bookTitle: string
  author: string
  count: number
}

export const ChartBook = () => {
  const { loading, error, data } = useQuery<{ books: IBook[] }>(MOST_READ_BOOKS)
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    if (data?.books?.length) {
      setChartData(
        data.books.map(({ bookTitle, author, count }) => {
          return {
            name: `${bookTitle}, ${author}`,
            count,
          }
        }),
      )
    }
  }, [data])

  return (
    <div className={s.wrapper}>
      <div className={s.title}>MOST READED BOOKS</div>
      {!!loading && <div className={s.loading}>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!chartData.length && <DiagramPie chartData={chartData} />}
    </div>
  )
}

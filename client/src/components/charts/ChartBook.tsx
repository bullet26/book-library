import { Flex } from 'antd'
import { MOST_READ_BOOKS } from '__graphql'
import { useQuery } from '@apollo/client/react'
import { DiagramPie } from 'components'
import { Error } from 'UI'
import s from './Chart.module.scss'

export const ChartBook = () => {
  const { loading, error, data } = useQuery(MOST_READ_BOOKS)

  if (loading) return <div className={s.loading}>Loading..</div>
  if (error) return <Error message={error?.message} />
  if (!data?.books?.length) return null

  return (
    <Flex vertical>
      <div className={s.title}>MOST READ BOOKS</div>
      <DiagramPie
        chartData={data.books.map(({ bookTitle, author, count }) => ({
          name: `${bookTitle}, ${author}`,
          count,
        }))}
      />
    </Flex>
  )
}

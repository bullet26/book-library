import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex } from 'antd'
import { MOST_READ_AUTHORS } from '__graphql'
import { useQuery } from '@apollo/client/react'
import { DiagramPie } from 'components'
import { Error } from 'UI'
import s from './Chart.module.scss'

export const ChartAuthor = () => {
  const { loading, error, data } = useQuery(MOST_READ_AUTHORS)
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    if (data?.authors?.length) {
      setChartData(
        data.authors.map(({ count, surname, name }) => {
          return {
            name: `${name} ${surname}`,
            count,
          }
        }),
      )
    }
  }, [data])

  if (loading) return <div className={s.loading}>Loading..</div>
  if (error) return <Error message={error?.message} />

  return (
    <Flex vertical>
      <Flex align="center" justify="space-between" className={s.header}>
        <div className={s.title}>MOST READ AUTHORS</div>
        <Link to="/authors?sortBy=bookCount">
          <Button
            shape="round"
            style={{
              width: '200px',
              height: '38px',
            }}>
            Show more
          </Button>
        </Link>
      </Flex>
      {!!chartData.length && <DiagramPie chartData={chartData} />}
    </Flex>
  )
}

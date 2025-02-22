import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { MOST_READED_AUTHORS } from 'apollo'
import { useQuery } from '@apollo/client'
import { DiagramPie } from 'components'
import { Error } from 'UI'
import s from './Chart.module.scss'

interface IAuthor {
  count: number
  name: string
  surname: number
}

const ChartAuthor: FC = () => {
  const { loading, error, data } = useQuery<{ authors: IAuthor[] }>(MOST_READED_AUTHORS)
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

  return (
    <div className={s.buttonWrapper}>
      <div className={s.wrapper}>
        <div className={s.titleBtnWrapper}>
          <div className={s.title}>MOST READED AUTHORS</div>
          <Link to="/most_reded_authors">
            <Button
              shape="round"
              style={{
                width: '200px',
                height: '38px',
              }}>
              Show more
            </Button>
          </Link>
        </div>
        {!!loading && <div className={s.loading}>Loading..</div>}
        {!!error && <Error message={error?.message} />}
        {!!chartData.length && <DiagramPie chartData={chartData} />}
      </div>
    </div>
  )
}

export default ChartAuthor

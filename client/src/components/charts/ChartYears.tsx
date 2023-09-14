import { FC, useEffect, useState } from 'react'
import { READ_STATISTIC } from 'apollo'
import { useQuery } from '@apollo/client'
import { DiagramBar } from 'components'
import { Error } from 'UI'
import s from './Chart.module.scss'

interface IStatistic {
  period: string
  count: number
}

const ChartYears: FC = () => {
  const { loading, error, data } = useQuery<{ statistic: IStatistic[] }>(READ_STATISTIC, {
    variables: {
      label: 'all',
      year: 2023,
    },
  })

  return (
    <div className={s.barwrapper}>
      <div className={s.title}>Reading dynamics</div>
      {!!loading && <div className={s.loading}>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!data?.statistic?.length && <DiagramBar chartData={data.statistic} />}
    </div>
  )
}

export default ChartYears

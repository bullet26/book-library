import { FC, useEffect, useState } from 'react'
import { READ_STATISTIC } from 'apollo'
import { useLazyQuery } from '@apollo/client'
import type { RadioChangeEvent } from 'antd'
import { DiagramBar } from 'components'
import { IStatistic } from 'types'
import { Error, RadioGroup } from 'UI'
import { checkEmptyPeriod } from './utils'
import s from './Chart.module.scss'

const ChartYears: FC = () => {
  const [label, setLabel] = useState<'all' | 'year'>('all')
  const [year, setYear] = useState('all')
  const [allYears, setAllYears] = useState<string[]>([])
  const [preapearedData, setPreapearedData] = useState<{ period: string; count: number }[]>([])

  const [getStatistic, { loading, error, data }] = useLazyQuery<{ statistic: IStatistic[] }>(
    READ_STATISTIC,
    {
      variables: {
        label,
        year: Number(year),
      },
    },
  )

  useEffect(() => {
    getStatistic()
  }, [])

  useEffect(() => {
    if (label === 'all' && data?.statistic) {
      setAllYears(data.statistic.map(({ period }) => period))
      setPreapearedData(data.statistic)
    }

    if (label === 'year' && data?.statistic) {
      setPreapearedData(checkEmptyPeriod(data.statistic))
    }
  }, [data, label])

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'all') {
      setLabel('all')
    } else {
      setLabel('year')
    }
    setYear(e.target.value)
    getStatistic()
  }

  return (
    <div className={s.barwrapper}>
      <div className={s.title}>Reading dynamics</div>
      {!!loading && <div className={s.loading}>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!data?.statistic?.length && (
        <>
          <RadioGroup onChange={handleChange} data={allYears} value={year} />
          <DiagramBar chartData={preapearedData} />
        </>
      )}
    </div>
  )
}

export default ChartYears

import { useEffect, useState } from 'react'
import { READ_STATISTIC } from 'apollo'
import { useLazyQuery } from '@apollo/client/react'
import type { RadioChangeEvent } from 'antd'
import { DiagramBar } from 'components'
import { type IStatistic } from 'types'
import { Error, RadioGroup } from 'UI'
import { checkEmptyPeriod } from './utils'
import s from './Chart.module.scss'

export const ChartYears = () => {
  const [label, setLabel] = useState<'all' | 'year'>('all')
  const [year, setYear] = useState('all')
  const [allYears, setAllYears] = useState<string[]>([])
  const [preparedData, setPreparedData] = useState<{ period: string; count: number }[]>([])

  const [getStatistic, { loading, error, data }] = useLazyQuery<{ statistic: IStatistic[] }>(
    READ_STATISTIC,
  )

  useEffect(() => {
    getStatistic({
      variables: {
        label: 'all',
        year: year === 'all' ? null : Number(year),
      },
    })
  }, [])

  useEffect(() => {
    if (label === 'all' && data?.statistic) {
      setAllYears(data.statistic.map(({ period }) => period))
      setPreparedData(data.statistic)
    }

    if (label === 'year' && data?.statistic) {
      setPreparedData(checkEmptyPeriod(data.statistic))
    }
  }, [data, label])

  const handleChange = (e: RadioChangeEvent) => {
    let label: 'all' | 'year' = 'year'
    const year = e.target.value
    if (e.target.value === 'all') {
      label = 'all'
    }

    getStatistic({
      variables: {
        label,
        year: year === 'all' ? null : Number(year),
      },
    })

    setLabel(label)
    setYear(year)
  }

  return (
    <div className={s.barWrapper}>
      <div className={s.title}>Reading dynamics</div>
      {!!loading && <div className={s.loading}>Loading..</div>}
      {!!error && <Error message={error?.message} />}
      {!!data?.statistic?.length && (
        <>
          <RadioGroup onChange={handleChange} data={allYears} value={year} />
          <DiagramBar chartData={preparedData} />
        </>
      )}
    </div>
  )
}

import { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { READ_STATISTIC } from 'apollo'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
import { Error } from 'UI'
import { IStatistic } from 'types'

interface YearSelectProps {
  year?: string
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const { year } = props
  const navigate = useNavigate()

  const [allYearsLabels, setAllYearsLabels] = useState<{ value: string; label: string }[]>([])

  const { data, error } = useQuery<{ statistic: IStatistic[] }>(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  })

  useEffect(() => {
    if (data) {
      setAllYearsLabels(data.statistic.map(({ period }) => ({ value: period, label: period })))
    }
  }, [data])

  const handleChange = (value: string) => {
    navigate(`/date/${value}`)
  }

  return (
    <>
      {!!error && <Error message={error?.message} />}
      {year ? (
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          options={allYearsLabels}
          onChange={handleChange}
        />
      ) : (
        <Select
          placeholder="Select a year"
          style={{ width: 120 }}
          options={allYearsLabels}
          onChange={handleChange}
        />
      )}
    </>
  )
}

export default YearSelect

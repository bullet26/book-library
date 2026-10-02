import { useQuery } from '@apollo/client/react'
import { READ_STATISTIC } from '__graphql'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
import { Error } from 'UI'
import { CalendarOutlined } from '@ant-design/icons'
import s from './YearNavigator.module.scss'

interface YearSelectProps {
  year?: string
}

export const YearNavigator = (props: YearSelectProps) => {
  const { year } = props
  const navigate = useNavigate()

  const { data, error } = useQuery(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  })

  const handleChange = (year: string) => {
    navigate(`/books/date/${year}`)
  }

  const selectItems = (data?.statistic || []).map(({ period }) => ({
    value: period,
    label: period,
  }))

  if (error) return <Error message={error?.message} />

  return (
    <Select
      placeholder="Go to Year..."
      value={year}
      className={s.wrapper}
      options={selectItems}
      onChange={handleChange}
      prefix={<CalendarOutlined />}
    />
  )
}

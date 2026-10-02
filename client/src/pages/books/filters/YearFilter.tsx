import { Select } from 'antd'

interface YearFilterProps {
  value: string | null
  onChange: (val: string | null) => void
  years: {
    count: number
    period: string
  }[]
}

export const YearFilter = (props: YearFilterProps) => {
  const { value, onChange, years = [] } = props

  const selectItems = years.map(({ period }) => ({
    value: period,
    label: period,
  }))

  return (
    <Select
      allowClear
      placeholder="Select a year"
      style={{ width: 120 }}
      value={value}
      options={selectItems}
      onChange={onChange}
    />
  )
}

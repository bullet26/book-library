import { Select } from 'antd'
import { Error } from 'UI'
import { useFilters } from '../hooks/useFilters'

export const YearFilter = () => {
  const { years, selectedYear, error, handleFilterChange } = useFilters()

  if (error) return <Error message={error} />

  const selectItems = years.map(({ period }) => ({
    value: period,
    label: period,
  }))

  return (
    <Select
      allowClear
      placeholder="Select a year"
      style={{ width: 120 }}
      value={selectedYear}
      options={selectItems}
      onChange={(value) => handleFilterChange('year', value)}
    />
  )
}

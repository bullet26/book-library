import { Select } from 'antd'
import { bookSortByLabels, useFilters } from '../hooks/useFilters'
import { Error } from 'UI'

export const SortBy = () => {
  const { error, sortBy, handleSortChange } = useFilters()

  if (error) return <Error message={error} />

  return (
    <Select
      value={sortBy}
      style={{ width: 200 }}
      options={Object.entries(bookSortByLabels).map(([value, label]) => ({ value, label }))}
      onChange={(value) => handleSortChange(value)}
    />
  )
}

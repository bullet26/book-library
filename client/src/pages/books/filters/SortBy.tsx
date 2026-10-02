import { Select } from 'antd'
import { bookSortByLabels } from '../hooks/useFilters'

interface SortByProps {
  value: string | null
  onChange: (val: string | null) => void
}

export const SortBy = (props: SortByProps) => {
  const { value, onChange } = props

  return (
    <Select
      value={value}
      style={{ width: 200 }}
      options={Object.entries(bookSortByLabels).map(([value, label]) => ({ value, label }))}
      onChange={onChange}
    />
  )
}

import { Segmented } from 'antd'
import { useFilters } from '../hooks/useFilters'

export const RatingFilter = () => {
  const { selectedRating, handleFilterChange } = useFilters()

  return (
    <Segmented
      value={selectedRating || 'ALL'}
      options={[
        { label: 'All', value: null },
        { label: '★ 5', value: '5' },
        { label: '★ 4', value: '4' },
        { label: '★ 3', value: '3' },
        { label: '★ 2', value: '2' },
        { label: '★ 1', value: '1' },
      ]}
      onChange={(value) => handleFilterChange('rating', value)}
    />
  )
}

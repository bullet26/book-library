import { Segmented } from 'antd'

interface RatingProps {
  value: string | null
  onChange: (val: string | null) => void
}

export const RatingFilter = (props: RatingProps) => {
  const { value, onChange } = props

  return (
    <Segmented
      value={value || 'ALL'}
      options={[
        { label: 'All', value: 'ALL' },
        { label: '★ 5', value: '5' },
        { label: '★ 4', value: '4' },
        { label: '★ 3', value: '3' },
        { label: '★ 2', value: '2' },
        { label: '★ 1', value: '1' },
      ]}
      onChange={(val) => onChange(val === 'ALL' ? null : val)}
    />
  )
}

import { Select } from 'antd'

interface TagFilterProps {
  value: string | null
  onChange: (val: string | null) => void
  tags: {
    id: string
    tag: string
  }[]
}

export const TagFilter = (props: TagFilterProps) => {
  const { tags, value, onChange } = props

  const options = tags.map((tag) => ({ value: tag.id, label: tag.tag }))

  return (
    <Select
      allowClear
      showSearch={{ optionFilterProp: 'label' }}
      placeholder="Select a tag"
      value={value}
      style={{ width: 220 }}
      options={options}
      onChange={onChange}
    />
  )
}

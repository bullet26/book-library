import { Select } from 'antd'
import { useFilters } from '../hooks/useFilters'

export const TagFilter = () => {
  const { tags, selectedTag, handleFilterChange } = useFilters()

  return (
    <Select
      allowClear
      showSearch={{ optionFilterProp: 'label' }}
      placeholder="Select a tag"
      value={selectedTag}
      style={{ width: 220 }}
      options={tags.map((tag) => ({ value: tag.id, label: tag.tag }))}
      onChange={(value) => handleFilterChange('tagId', value || null)}
    />
  )
}

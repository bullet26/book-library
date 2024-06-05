import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'

interface SortTypeSelectProps {
  tagID: string | null
  sortBy: string | null
}

const SortTypeSelect: FC<SortTypeSelectProps> = (props) => {
  const { tagID = '', sortBy } = props
  const navigate = useNavigate()

  const ALL_SORT_OPTIONS = [
    { value: 'title', label: 'by Title' },
    { value: 'author', label: 'by Author Surname' },
  ]

  const handleChange = (_sortBy: string) => {
    let url = `/tag?sortBy=${encodeURIComponent(_sortBy)}`
    if (tagID) {
      url += `&tagID=${encodeURIComponent(tagID)}`
    }
    navigate(url)
  }

  return sortBy ? (
    <Select
      defaultValue={sortBy}
      style={{ width: 120 }}
      options={ALL_SORT_OPTIONS}
      onChange={handleChange}
    />
  ) : (
    <Select
      placeholder="Select a sort type"
      style={{ width: 120 }}
      options={ALL_SORT_OPTIONS}
      onChange={handleChange}
    />
  )
}

export default SortTypeSelect

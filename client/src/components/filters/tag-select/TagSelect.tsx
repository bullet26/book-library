import { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_TAGS } from 'apollo'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
import { Error } from 'UI'
import { Tag } from 'types'

interface TagSelectProps {
  tagID: string | null
  sortBy: string | null
}

const TagSelect: FC<TagSelectProps> = (props) => {
  const { tagID, sortBy } = props
  const navigate = useNavigate()

  const [allTagLabels, setAllTagLabels] = useState<{ value: string; label: string }[]>([])

  const { data, error } = useQuery<{ tags: Tag[] }>(ALL_TAGS, {})

  useEffect(() => {
    if (data) {
      setAllTagLabels(data.tags.map(({ id, tag }) => ({ value: id, label: tag })))
    }
  }, [data])

  const handleChange = (tagId: string) => {
    let url = `/tag?tagID=${encodeURIComponent(tagId)}`
    if (sortBy) {
      url += `&sortBy=${encodeURIComponent(sortBy)}`
    }
    navigate(url)
  }

  return (
    <>
      {!!error && <Error message={error?.message} />}
      {tagID ? (
        <Select
          defaultValue={tagID}
          style={{ width: 120 }}
          options={allTagLabels}
          onChange={handleChange}
        />
      ) : (
        <Select
          placeholder="Select a tag"
          style={{ width: 120 }}
          options={allTagLabels}
          onChange={handleChange}
        />
      )}
    </>
  )
}

export default TagSelect

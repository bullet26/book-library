import { FC, useState, useEffect } from 'react'
import { Button, Select, Tag } from 'antd'
import type { SelectProps } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_TAGS, CREATE_LINK_TAG_WITH_BOOK } from 'apollo'
import { useNavigate } from 'react-router-dom'
import { Error } from 'UI'
import { Tag as ITag } from 'types'
import s from './SelectTag.module.scss'

type TagRender = SelectProps['tagRender']

interface SelectTagProps {
  tags: ITag[]
  bookID?: string
}

const tagRender: TagRender = (props) => {
  const { label } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag bordered={false} color="magenta" onMouseDown={onPreventMouseDown}>
      {label}
    </Tag>
  )
}

const SelectTag: FC<SelectTagProps> = (props) => {
  const { tags, bookID } = props
  const navigate = useNavigate()

  const { data, error } = useQuery<{ tags: ITag[] }>(ALL_TAGS, {})

  const [updateLinkTagWithBook, { loading, error: errorTag }] = useMutation(
    CREATE_LINK_TAG_WITH_BOOK,
    {
      update(cache, { data: { book } }) {
        cache.modify({
          id: cache.identify(book),
          fields: {
            book,
          },
        })
      },
    },
  )

  const [allTagLabels, setAllTagLabels] = useState<{ value: string; label: string }[]>([])
  const [selectedTag, setSelectedTag] = useState(tags.map((item) => item.id))

  useEffect(() => {
    if (data) {
      setAllTagLabels(data.tags.map(({ id, tag }) => ({ value: id, label: tag })))
    }
  }, [data])

  const handleClickTag = (tagId: string) => {
    if (tagId) {
      navigate(`/tag/${tagId}`)
    }
  }

  const onChange = (values: string[]) => {
    setSelectedTag(values)
  }

  const onSubmit = () => {
    updateLinkTagWithBook({ variables: { input: { bookID, tagID: selectedTag } } })
  }

  return (
    <>
      {(!!error || !!errorTag) && <Error message={error?.message || errorTag?.message} />}
      <div className={s.tagWrapper}>
        {tags.map((item) => (
          <Tag
            bordered={false}
            key={item.id}
            color="magenta"
            onClick={() => handleClickTag(item.id)}>
            {item.tag}
          </Tag>
        ))}
      </div>
      <Select
        mode="multiple"
        tagRender={tagRender}
        defaultValue={tags.map((item) => item.id)}
        style={{ width: '100%' }}
        options={allTagLabels}
        onChange={onChange}
      />
      <Button type="dashed" onClick={onSubmit} disabled={loading}>
        OK
      </Button>
    </>
  )
}

export default SelectTag

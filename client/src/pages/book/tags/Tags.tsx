import { useState, useEffect } from 'react'
import { Button, Flex, Select, Tag } from 'antd'
import type { SelectProps } from 'antd'
import { useQuery, useMutation } from '@apollo/client/react'
import { ALL_TAGS, CREATE_LINK_TAG_WITH_BOOK } from '__graphql'
import { useNavigate } from 'react-router-dom'
import { useReactContext } from 'providers'
import { Error } from 'UI'
import { type GetOneBookByIdQuery } from '__graphql/__generated__/graphql'
import s from './Tags.module.scss'

type TagRender = SelectProps['tagRender']

type ITag = NonNullable<GetOneBookByIdQuery['book']>['tags'][number]
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
    <Tag variant="filled" color="magenta" onMouseDown={onPreventMouseDown}>
      {label}
    </Tag>
  )
}

export const Tags = (props: SelectTagProps) => {
  const { tags, bookID } = props
  const navigate = useNavigate()
  const { isEditMode } = useReactContext()

  const { data, error } = useQuery(ALL_TAGS, {})

  const [updateLinkTagWithBook, { loading, error: errorTag }] = useMutation(
    CREATE_LINK_TAG_WITH_BOOK,
    {
      update(cache, { data }) {
        if (!data) return
        cache.modify({
          id: cache.identify(data.book),
          fields: {
            tags() {
              return data.book.tags
            },
          },
        })
      },
    },
  )

  const [allTagLabels, setAllTagLabels] = useState<{ value: string; label: string }[]>([])
  const [selectedTag, setSelectedTag] = useState(tags.map((item) => item.id))

  useEffect(() => {
    if (data?.tags) {
      const tagLabels = data.tags.map(({ id, tag }) => ({ value: id, label: tag }))

      setAllTagLabels(tagLabels)
    }
  }, [data])

  const handleClickTag = (tagId: string) => {
    if (tagId) {
      navigate(`/books?tagId=${encodeURIComponent(tagId)}`)
    }
  }

  const onChange = (values: string[]) => {
    setSelectedTag(values)
  }

  const onSubmit = () => {
    if (!bookID) return
    updateLinkTagWithBook({ variables: { input: { bookID, tagID: selectedTag } } })
  }

  if (!!error || !!errorTag) return <Error message={error?.message || errorTag?.message} />

  return (
    <>
      <Flex wrap justify="space-around" align="center" gap="medium" className={s.cursorPointer}>
        {tags.map((item) => (
          <Tag
            variant="filled"
            key={item.id}
            color="magenta"
            onClick={() => handleClickTag(item.id)}>
            {item.tag}
          </Tag>
        ))}
      </Flex>

      {isEditMode && (
        <>
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
      )}
    </>
  )
}

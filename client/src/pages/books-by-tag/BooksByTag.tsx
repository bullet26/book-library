import { FC } from 'react'
import { Tag } from 'antd'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS_BY_TAG } from 'apollo'
import { Tag as ITag } from 'types'
import { CardListBooks, SortTypeSelect, TagSelect } from 'components'
import { Loader, Error } from 'UI'
import s from './BooksByTag.module.scss'

interface BooksQuery {
  tagData: ITag
}

export const BooksByTag: FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tagID = queryParams.get('tagID')
  const sortBy = queryParams.get('sortBy') || 'author'

  const { loading, error, data } = useQuery<BooksQuery>(ALL_BOOKS_BY_TAG, {
    variables: { id: tagID, sortBy },
  })

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <>
          <div className={s.titleWrapper}>
            <div className={s.filterWrapper}>
              <TagSelect tagID={tagID} sortBy={sortBy} />
              <SortTypeSelect tagID={tagID} sortBy={sortBy} />
            </div>
            <div className={s.title}>
              <span>Books by tag:</span>&nbsp;
              <Tag bordered={false} color="magenta">
                #{data.tagData.tag}
              </Tag>
            </div>
          </div>
          <CardListBooks data={data.tagData.booksInTag} typeData="tag" />
        </>
      )}
    </>
  )
}

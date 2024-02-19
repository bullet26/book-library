import { FC } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_TAG } from 'apollo'
import { Tag as ITag } from 'types'
import { CardListBooks } from 'components'
import { Loader, Error } from 'UI'
import s from './BooksByTag.module.scss'

interface BooksQuery {
  tagData: ITag
}

export const BooksByTag: FC = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery<BooksQuery>(ALL_BOOKS_BY_TAG, {
    variables: { id },
  })

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <>
          <div className={s.title}>
            <span>Books by tag:</span>&nbsp;
            <Tag bordered={false} color="magenta">
              #{data.tagData.tag}
            </Tag>
          </div>
          <CardListBooks data={data.tagData.booksInTag} typeData="tag" />
        </>
      )}
    </>
  )
}

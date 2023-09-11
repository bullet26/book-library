import { FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useSearchParams } from 'react-router-dom'
import { CardListAuthors } from 'components'
import { Loader, Pagination, Error } from 'UI'
import { Author } from 'types'
import { ALL_AUTHORS } from 'apollo'
import s from './Authors.module.scss'

interface AuthorsQuery {
  getAllAuthors: { authors: Author[]; totalCount: number }
}

const Authors: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { loading, error, data } = useQuery<AuthorsQuery>(ALL_AUTHORS, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const authors = data?.getAllAuthors.authors
  const totalCount = data?.getAllAuthors.totalCount

  const handleSubmit = (current: number, pageSize: number) => {
    setSearchParams({ page: String(current), perpage: String(pageSize) })
  }

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <Pagination
            total={totalCount || 0}
            perPageRange={[20, 50, 100, 200]}
            current={Number(searchParams.get('page'))}
            pageSize={Number(searchParams.get('perpage'))}
            handleSubmit={handleSubmit}
          />
          <CardListAuthors data={authors || []} />
          <Pagination
            total={totalCount || 0}
            perPageRange={[20, 50, 100, 200]}
            current={Number(searchParams.get('page'))}
            pageSize={Number(searchParams.get('perpage'))}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  )
}

export default Authors

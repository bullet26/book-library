import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useSearchParams } from 'react-router-dom'
import { CardListBooksByDate } from 'components'
import { Loader, Pagination } from 'UI'
import { ReadDateBook } from 'types'
import { ALL_BOOKS_BY_DATE } from 'apollo'
import s from './BooksByDate.module.scss'

interface BooksByDateQuery {
  getAllBooksByDate: { readDate: ReadDateBook[]; totalCount: number }
}

const BooksByDate: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { loading, error, data } = useQuery<BooksByDateQuery>(ALL_BOOKS_BY_DATE, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const books = data?.getAllBooksByDate.readDate
  const totalCount = data?.getAllBooksByDate.totalCount

  const handleSubmit = (current: number, pageSize: number) => {
    setSearchParams({ page: String(current), perpage: String(pageSize) })
  }

  return !loading ? (
    <div className={s.wrapper}>
      <Pagination
        current={Number(searchParams.get('page'))}
        pageSize={Number(searchParams.get('perpage'))}
        total={totalCount || 0}
        perPageRange={[20, 50, 100, 200]}
        handleSubmit={handleSubmit}
      />
      <CardListBooksByDate data={books || []} />
      <Pagination
        current={Number(searchParams.get('page'))}
        pageSize={Number(searchParams.get('perpage'))}
        total={totalCount || 0}
        perPageRange={[20, 50, 100, 200]}
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <Loader />
  )
}

export default BooksByDate

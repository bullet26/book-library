import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useSearchParams } from 'react-router-dom'
import { CardListBooks, YearSelect, TagSelect } from 'components'
import { Loader, Pagination, Error, Button } from 'UI'
import { ReadDateBook } from 'types'
import { ALL_BOOKS_BY_DATE } from 'apollo'
import s from './Books.module.scss'

interface BooksQuery {
  getAllBooksByDate: { readDate: ReadDateBook[]; totalCount: number }
}

const BooksByDate: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { loading, error, data } = useQuery<BooksQuery>(ALL_BOOKS_BY_DATE, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const books = data?.getAllBooksByDate.readDate
  const totalCount = data?.getAllBooksByDate.totalCount
  const windowWidth = window.innerWidth

  const handleSubmit = (current: number, pageSize: number) => {
    setSearchParams({ page: String(current), perpage: String(pageSize) })
  }

  return (
    <>
      {!!loading && <Loader />}
      {!!error && <Error message={error?.message} />}
      {!!data && (
        <div className={s.wrapper}>
          <div className={s.paginationTagWrapper}>
            <Pagination
              current={Number(searchParams.get('page'))}
              pageSize={Number(searchParams.get('perpage'))}
              total={totalCount || 0}
              perPageRange={[20, 50, 100, 200]}
              handleSubmit={handleSubmit}
            />
            <div className={s.innerWrapper}>
              <YearSelect />
              <TagSelect tagID={null} sortBy={null} />
              {windowWidth < 729 && <Button />}
            </div>
          </div>
          <CardListBooks data={books || []} typeData="readDate" />
          <Pagination
            current={Number(searchParams.get('page'))}
            pageSize={Number(searchParams.get('perpage'))}
            total={totalCount || 0}
            perPageRange={[20, 50, 100, 200]}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  )
}

export default BooksByDate

import { useQuery } from '@apollo/client/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { YearSelect, TagSelect } from 'components'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { ALL_BOOKS_BY_DATE } from '__graphql'
import s from './Books.module.scss'

export const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const { loading, error, data } = useQuery(ALL_BOOKS_BY_DATE, {
    variables: {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('perpage')) || 50,
    },
  })

  const handleClick = (id?: string) => {
    if (id) {
      navigate(`/books/${id}`)
    }
  }

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
            <div className={s.innerWrapper}>
              <Pagination
                current={Number(searchParams.get('page'))}
                pageSize={Number(searchParams.get('perpage'))}
                total={totalCount || 0}
                handleSubmit={handleSubmit}
              />
              {windowWidth < 729 && <ActivateEditMode />}
            </div>

            <div className={s.innerWrapper}>
              <YearSelect />
              <TagSelect tagID={null} sortBy={null} />
            </div>
          </div>

          <div className={s.cardWrapper}>
            {books &&
              books.map((item) => (
                <Card
                  id={item.books.id}
                  img={item.books.bookCoverThumbnail}
                  title={item.books.title}
                  subtitle={`${item.books.author.name} ${item.books.author.surname}`}
                  rating={item.books.rating}
                  onClick={handleClick}
                  type="book"
                />
              ))}
          </div>

          <Pagination
            current={Number(searchParams.get('page'))}
            pageSize={Number(searchParams.get('perpage'))}
            total={totalCount || 0}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  )
}

import { YearSelect, TagSelect } from 'components'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { useBooks } from './hook/useBooks'
import s from './Books.module.scss'

export const Books = () => {
  const {
    books,
    totalCount,
    loading,
    error,
    page,
    limit,
    // sortBy,
    // handleSortChange,
    handlePagination,
    handleClickCard,
  } = useBooks()

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  return (
    !!books && (
      <div className={s.wrapper}>
        <div className={s.paginationTagWrapper}>
          <div className={s.innerWrapper}>
            <Pagination
              current={page}
              pageSize={limit}
              total={totalCount}
              handleSubmit={handlePagination}
            />
            <div className={s.toolbarMobileOnly}>
              <ActivateEditMode />
            </div>
          </div>

          <div className={s.innerWrapper}>
            <YearSelect />
            <TagSelect tagID={null} sortBy={null} />
          </div>
        </div>

        <div className={s.cardWrapper}>
          {books.map((item) => (
            <Card
              id={item.id}
              img={item.bookCoverThumbnail}
              title={item.title}
              subtitle={`${item.author.name} ${item.author.surname}`}
              rating={item.rating}
              onClick={handleClickCard}
              type="book"
            />
          ))}
        </div>

        <Pagination
          current={page}
          pageSize={limit}
          total={totalCount}
          handleSubmit={handlePagination}
        />
      </div>
    )
  )
}

import { Flex } from 'antd'
import { Loader, Pagination, Error, Card } from 'UI'
import { useBooks } from './hooks/useBooks'
import { EmptyBooks } from './filters'
import { FiltersBlock } from './FiltersBlock'
import { useFilters } from './hooks/useFilters'
import s from './Books.module.scss'

export const Books = () => {
  const { books, totalCount, loading, error, page, limit, handlePagination, handleClickCard } =
    useBooks()

  const { isDesktop } = useFilters()

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  return (
    <Flex vertical justify="flex-start" gap="large">
      {isDesktop ? (
        <>
          <FiltersBlock />
          {!!totalCount && (
            <Pagination
              current={page}
              pageSize={limit}
              total={totalCount}
              handleSubmit={handlePagination}
            />
          )}
        </>
      ) : (
        <Flex justify="space-between">
          {!!totalCount && (
            <Pagination
              current={page}
              pageSize={limit}
              total={totalCount}
              handleSubmit={handlePagination}
            />
          )}
          <FiltersBlock />
        </Flex>
      )}
      <div className={s.cardWrapper}>
        {books.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            img={item.bookCoverThumbnail}
            title={item.title}
            subtitle={`${item.author.name} ${item.author.surname}`}
            rating={item.rating}
            onClick={handleClickCard}
            type="book"
          />
        ))}
        {!totalCount && <EmptyBooks />}
      </div>

      {!!totalCount && (
        <Pagination
          current={page}
          pageSize={limit}
          total={totalCount}
          handleSubmit={handlePagination}
        />
      )}
    </Flex>
  )
}

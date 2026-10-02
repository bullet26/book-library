import { Button, Flex } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { YearNavigator } from 'components'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { useBooks } from './hooks/useBooks'
import { EmptyBooks, RatingFilter, SortBy, TagFilter, YearFilter } from './filters'
import { useFilters } from './hooks/useFilters'
import s from './Books.module.scss'

export const Books = () => {
  const { books, totalCount, loading, error, page, limit, handlePagination, handleClickCard } =
    useBooks()
  const { resetFilters } = useFilters()

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  const resetBtnJSX = <Button type="primary" onClick={resetFilters} icon={<CloseOutlined />} />

  return (
    <Flex vertical justify="flex-start" gap="large">
      <Flex gap="medium" align="center" wrap justify="space-between">
        <SortBy />
        <div className={s.toolbarMobileOnly}>{resetBtnJSX}</div>
        <RatingFilter />
        <TagFilter />
        <YearFilter />
        <YearNavigator />
        <div className={s.toolbarDesktopOnly}>{resetBtnJSX}</div>
      </Flex>

      <Flex gap="medium" align="center" wrap justify="space-between">
        {!!totalCount && (
          <Pagination
            current={page}
            pageSize={limit}
            total={totalCount}
            handleSubmit={handlePagination}
          />
        )}
        <div className={s.toolbarMobileOnly}>
          <ActivateEditMode />
        </div>
      </Flex>

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

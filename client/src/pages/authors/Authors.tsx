import { Flex, Select } from 'antd'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { getRandomImage } from 'utils'
import { useAuthors, ALL_SORT_OPTIONS } from './hook/useAuthors'
import s from './Authors.module.scss'

export const Authors = () => {
  const {
    authors,
    totalCount,
    loading,
    error,
    page,
    limit,
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  } = useAuthors()

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  return (
    <Flex vertical justify="flex-start" gap="large">
      <Flex justify="space-between" align="center" gap="large">
        <Pagination
          total={totalCount}
          current={page}
          pageSize={limit}
          handleSubmit={handlePagination}
        />
        <Select
          placeholder="Sort by..."
          value={sortBy}
          style={{ width: 170 }}
          options={ALL_SORT_OPTIONS}
          onChange={handleSortChange}
        />
      </Flex>

      <div className={s.cardWrapper}>
        {authors.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            img={item.portraitThumbnail || getRandomImage()}
            title={item.surname || ''}
            subtitle={item.name}
            count={'count' in item ? (item.count as number) : undefined}
            onClick={handleClickCard}
            type="author"
          />
        ))}
      </div>

      <Pagination
        total={totalCount}
        current={page}
        pageSize={limit}
        handleSubmit={handlePagination}
      />
    </Flex>
  )
}

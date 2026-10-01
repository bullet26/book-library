import { Dropdown, Space } from 'antd'
import { Loader, Pagination, Error, ActivateEditMode, Card } from 'UI'
import { getRandomImage } from 'utils'
import { useAuthors, sortItems } from './hook/useAuthors'
import s from './Authors.module.scss'
import { DownOutlined } from '@ant-design/icons'

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

  const sortSelectJSX = (
    <Dropdown
      menu={{
        items: sortItems,
        selectedKeys: [sortBy],
        onClick: (e) => handleSortChange(e.key),
      }}
      trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Sort by
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )

  return (
    <div className={s.wrapper}>
      <div className={s.subHeaderWrapper}>
        <Pagination
          total={totalCount}
          current={page}
          pageSize={limit}
          handleSubmit={handlePagination}
        />
        <div className={s.toolbarDesktopOnly}>{sortSelectJSX}</div>
        <div className={s.toolbarMobileOnly}>
          <ActivateEditMode />
        </div>
      </div>

      <div className={s.toolbarMobileOnly}>{sortSelectJSX}</div>

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
    </div>
  )
}

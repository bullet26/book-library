import { Button, Divider, Drawer, Flex } from 'antd'
import { useState } from 'react'
import { CloseOutlined, FilterOutlined } from '@ant-design/icons'
import { YearNavigator } from 'components'
import { useFilters } from './hooks/useFilters'
import { RatingFilter, SortBy, TagFilter, YearFilter } from './filters'
import { ActivateEditMode, Error } from 'UI'

export const FiltersBlock = () => {
  const {
    selectedTag,
    selectedRating,
    selectedYear,
    sortBy,
    handleFilterChange,
    applyFilters,
    resetFilters,
    isDesktop,
    tags,
    years,
    error,
  } = useFilters()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const onCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const resetButton = () => (
    <Button type="text" danger onClick={resetFilters} icon={<CloseOutlined />}>
      Reset
    </Button>
  )

  if (error) return <Error message={error} />

  if (isDesktop) {
    return (
      <Flex gap="medium" align="center" wrap justify="space-between">
        <SortBy value={sortBy} onChange={(val) => handleFilterChange('sortBy', val)} />
        <RatingFilter
          value={selectedRating}
          onChange={(val) => handleFilterChange('rating', val)}
        />
        <TagFilter
          value={selectedTag}
          tags={tags}
          onChange={(val) => handleFilterChange('tagId', val || null)}
        />
        <YearFilter
          value={selectedYear}
          years={years}
          onChange={(val) => handleFilterChange('year', val)}
        />
        <YearNavigator />
        {resetButton()}
      </Flex>
    )
  }

  // mobile view -> Drawer
  return (
    <>
      <Button type="primary" icon={<FilterOutlined />} onClick={() => setIsDrawerOpen(true)}>
        Filters
      </Button>
      <Drawer
        title="Filters"
        placement="right"
        size="85vh"
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        closeIcon={<CloseOutlined />}
        extra={resetButton()}
        footer={
          <Button
            type="primary"
            block
            size="large"
            onClick={() => {
              applyFilters()
              onCloseDrawer()
            }}>
            Apply
          </Button>
        }>
        <Flex wrap gap="large" justify="space-between">
          <SortBy value={sortBy} onChange={(val) => handleFilterChange('sortBy', val)} />
          <RatingFilter
            value={selectedRating}
            onChange={(val) => handleFilterChange('rating', val)}
          />
          <TagFilter
            value={selectedTag}
            tags={tags}
            onChange={(val) => handleFilterChange('tagId', val || null)}
          />
          <YearFilter
            value={selectedYear}
            years={years}
            onChange={(val) => handleFilterChange('year', val)}
          />
          <Divider />
          <YearNavigator />
          <ActivateEditMode />
        </Flex>
      </Drawer>
    </>
  )
}

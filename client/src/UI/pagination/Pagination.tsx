import { Pagination as AntPagination } from 'antd'
import type { PaginationProps } from 'antd'

interface IPaginationProps {
  total: number
  current: number
  pageSize: number
  perPageRange: number[]
  handleSubmit: (current: number, pageSize: number) => void
}

export const Pagination = (props: IPaginationProps) => {
  const { total, perPageRange, current, pageSize, handleSubmit } = props
  const windowWidth = window.innerWidth

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    handleSubmit(current, pageSize)
  }

  return (
    <AntPagination
      total={total}
      current={current || 1}
      pageSize={pageSize || 50}
      showTotal={(total, range) =>
        windowWidth >= 600 ? `${range[0]}-${range[1]} of ${total} items` : null
      }
      showSizeChanger
      onChange={onChange}
      defaultPageSize={50}
      pageSizeOptions={perPageRange}
      defaultCurrent={1}
      size={windowWidth >= 430 ? 'default' : 'small'}
    />
  )
}

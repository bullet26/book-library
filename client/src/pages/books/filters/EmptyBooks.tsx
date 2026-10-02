import { BookOutlined } from '@ant-design/icons'
import { useFilters } from '../hooks/useFilters'
import { Button } from 'antd'
import s from './Filters.module.scss'

export const EmptyBooks = () => {
  const { resetFilters } = useFilters()
  return (
    <div className={s.emptyBooksWrapper}>
      <BookOutlined className={s.icon} />
      <h3 className={s.title}>No books found</h3>
      <p className={s.paragraph}>
        Either your criteria are too high, or you haven't read anything matching this yet
      </p>
      <Button type="primary" onClick={resetFilters}>
        Reset filters
      </Button>
    </div>
  )
}

import { FC } from 'react'
import { Tabs } from 'antd'
import { BookInfoTab, BookPlotTab } from 'components'

const BookTab: FC = () => {
  return (
    <Tabs
      type="card"
      items={[
        {
          label: 'Info',
          key: 'info',
          children: <BookInfoTab />,
        },
        {
          label: 'Plot',
          key: 'plot',
          children: <BookPlotTab />,
        },
      ]}
    />
  )
}

export default BookTab

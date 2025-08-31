import { Tabs } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { ONE_BOOK_BY_ID } from 'apollo'
import { type Book as IBook } from 'types'
import { BookInfoTab, BookPlotTab, BookMediaTab } from 'components'

interface BookQuery {
  book: IBook
}

export const BookTab = () => {
  const { id } = useParams()
  const { data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } })

  return (
    <Tabs
      type="card"
      items={[
        {
          label: 'Info',
          key: 'info',
          children: <BookInfoTab data={data} />,
        },
        {
          label: 'Plot',
          key: 'plot',
          children: <BookPlotTab />,
        },
        {
          label: 'Media',
          key: 'media',
          children: <BookMediaTab />,
          disabled: !data?.book.isAdditionalMediaExist,
        },
      ]}
    />
  )
}

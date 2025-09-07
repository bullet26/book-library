import { Tabs } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { ONE_BOOK_BY_ID } from '__graphql'
import { BookInfoTab, BookPlotTab, BookMediaTab } from 'components'

export const BookTab = () => {
  const { id } = useParams()
  const { data } = useQuery(ONE_BOOK_BY_ID, { skip: !id, variables: { id } })

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
          disabled: !data?.book?.isAdditionalMediaExist,
        },
      ]}
    />
  )
}

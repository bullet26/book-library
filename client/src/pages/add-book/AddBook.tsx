import { useState } from 'react'
import { Radio } from 'antd'
import { AddBookNew, AddBookReread, AddMediaForBook } from 'pages'

export const AddBook = () => {
  const [page, setPage] = useState('new-book')

  return (
    <>
      <Radio.Group onChange={(e) => setPage(e.target.value)} value={page}>
        <Radio value="new-book">Add new book</Radio>
        <Radio value="reread">Add new read date (reread)</Radio>
        <Radio value="media">Add media for book</Radio>
      </Radio.Group>
      {page === 'new-book' && <AddBookNew />}
      {page === 'reread' && <AddBookReread />}
      {page === 'media' && <AddMediaForBook />}
    </>
  )
}

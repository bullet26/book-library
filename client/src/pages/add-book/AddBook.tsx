import { FC, useState } from 'react'
import { Switch } from 'antd'
import { AddBookNew, AddBookReread } from 'pages'

const AddBook: FC = () => {
  const [isNewBook, setBookStatus] = useState(true)
  const onChange = () => setBookStatus((prevState) => !prevState)
  return (
    <>
      <Switch
        checkedChildren="new book"
        unCheckedChildren="reread"
        defaultChecked
        onChange={onChange}
      />
      {isNewBook ? <AddBookNew /> : <AddBookReread />}
    </>
  )
}

export default AddBook

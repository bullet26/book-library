import { FC } from 'react'
import { AddBookForm } from 'components'
import s from './AddBook.module.scss'

const AddBook: FC = () => {
  return (
    <>
      <div className={s.title}>Add read book</div>
      <AddBookForm />
    </>
  )
}

export default AddBook

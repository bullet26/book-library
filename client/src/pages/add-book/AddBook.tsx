import { FC } from 'react'
import { AddBookForm } from 'components'
import { DropZone } from 'UI'
import s from './AddBook.module.scss'

const AddBook: FC = () => {
  return (
    <>
      <div className={s.title}>Add read book</div>
      <div className={s.formWrapper}>
        <AddBookForm />
        <DropZone />
      </div>
    </>
  )
}

export default AddBook

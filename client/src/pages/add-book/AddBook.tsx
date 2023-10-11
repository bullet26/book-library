import { FC, useState } from 'react'
import { AddBookForm, AddAuthorForm } from 'components'
import { DropZone } from 'UI'
import s from './AddBook.module.scss'

const AddBook: FC = () => {
  const [isShowAuyhorForm, setStatusShowAuyhorForm] = useState(false)

  const handleClickAuthorBtn = () => {
    setStatusShowAuyhorForm((prevState) => !prevState)
  }

  const handleHideAuthorForm = () => {
    setStatusShowAuyhorForm(false)
  }

  return (
    <div className={s.formWrapper}>
      <AddBookForm
        handleClickAuthorBtn={handleClickAuthorBtn}
        isShowAuyhorForm={isShowAuyhorForm}
      />
      {isShowAuyhorForm && <AddAuthorForm handleHideForm={handleHideAuthorForm} />}
      <DropZone status={!isShowAuyhorForm} />
    </div>
  )
}

export default AddBook

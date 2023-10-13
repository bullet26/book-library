import { FC, useState } from 'react'
import { AddBookForm, AddAuthorForm } from 'components'
import { DropZone } from 'UI'
import s from './AddBook.module.scss'

const AddBook: FC = () => {
  const [isShowAuyhorForm, setStatusShowAuyhorForm] = useState(false)
  const [bookCover, setFieldValue] = useState<string | null>(null)

  const handleClickAuthorBtn = () => {
    setStatusShowAuyhorForm((prevState) => !prevState)
  }

  const handleHideAuthorForm = () => {
    setStatusShowAuyhorForm(false)
  }

  const getLinkforUploadedImg = (link: string) => {
    //!fix bookCover
    setFieldValue(link)
  }

  return (
    <div className={s.formWrapper}>
      <AddBookForm
        handleClickAuthorBtn={handleClickAuthorBtn}
        isShowAuyhorForm={isShowAuyhorForm}
      />
      {isShowAuyhorForm && <AddAuthorForm handleHideForm={handleHideAuthorForm} />}
      <DropZone status={!isShowAuyhorForm} addLinkToForm={getLinkforUploadedImg} />
    </div>
  )
}

export default AddBook

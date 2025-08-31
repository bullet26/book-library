import { useState } from 'react'
import { AddBookForm, AddAuthorForm, AddSerieForm } from 'components'
import { DropZone } from 'UI'
import s from './AddBook.module.scss'

export const AddBookNew = () => {
  const [isShowAuthorForm, setStatusShowAuthorForm] = useState(false)
  const [isShowSerieForm, setStatusShowSerieForm] = useState(false)
  const [bookCover, setFieldValue] = useState<string | null>(null)

  const handleClickAuthorBtn = () => {
    setStatusShowAuthorForm((prevState) => !prevState)
  }

  const handleHideAuthorForm = () => {
    setTimeout(() => setStatusShowAuthorForm(false), 5000)
  }

  const handleClickSerieBtn = () => {
    setStatusShowSerieForm((prevState) => !prevState)
  }

  const handleHideSerieForm = () => setTimeout(() => setStatusShowSerieForm(false), 5000)

  const getLinkForUploadedImg = (link: string) => {
    setFieldValue(link)
  }

  return (
    <div className={s.formWrapper}>
      {isShowSerieForm && <AddSerieForm handleHideForm={handleHideSerieForm} />}
      <AddBookForm
        bookCover={bookCover}
        handleClickAuthorBtn={handleClickAuthorBtn}
        isShowAuthorForm={isShowAuthorForm}
        isShowSerieForm={isShowSerieForm}
        handleClickSerieBtn={handleClickSerieBtn}
      />
      {isShowAuthorForm && <AddAuthorForm handleHideForm={handleHideAuthorForm} />}
      <DropZone status={!isShowAuthorForm} addLinkToForm={getLinkForUploadedImg} />
    </div>
  )
}

import { useState } from 'react'
import { AddBookForm, AddAuthorForm, AddSerieForm } from 'components'
import s from './AddBook.module.scss'

export const AddBookNew = () => {
  const [isShowAuthorForm, setStatusShowAuthorForm] = useState(false)
  const [isShowSerieForm, setStatusShowSerieForm] = useState(false)

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

  return (
    <div className={s.formWrapperAddNewBook}>
      {isShowSerieForm && <AddSerieForm handleHideForm={handleHideSerieForm} />}
      <div className={s.formBookAuthorWrapper}>
        <AddBookForm
          handleClickAuthorBtn={handleClickAuthorBtn}
          isShowAuthorForm={isShowAuthorForm}
          isShowSerieForm={isShowSerieForm}
          handleClickSerieBtn={handleClickSerieBtn}
        />
        {isShowAuthorForm && (
          <div className={s.authorColumn}>
            <AddAuthorForm handleHideForm={handleHideAuthorForm} />
          </div>
        )}
      </div>
    </div>
  )
}

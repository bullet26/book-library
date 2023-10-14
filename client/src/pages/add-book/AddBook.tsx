import { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_AUTHOR, CREATE_BOOK } from 'apollo'
import { AuthorInput, BookInput } from 'types'
import { AddBookForm, AddAuthorForm } from 'components'
import { DropZone, Error } from 'UI'
import s from './AddBook.module.scss'

const AddBook: FC = () => {
  const [createAuthorApollo, { data: newAuthor, error: errorAuthor }] = useMutation(CREATE_AUTHOR)
  const [createBookApollo, { data: newBook, error: errorBook }] = useMutation(CREATE_BOOK)
  // TODO show modal when book added
  const [isShowAuthorForm, setStatusShowAuyhorForm] = useState(false)
  const [bookCover, setFieldValue] = useState<string | null>(null)

  const handleClickAuthorBtn = () => {
    setStatusShowAuyhorForm((prevState) => !prevState)
  }

  const handleHideAuthorForm = () => {
    setStatusShowAuyhorForm(false)
  }

  const getLinkforUploadedImg = (link: string) => {
    setFieldValue(link)
  }

  const handleOnSubmitAuthorForm = (values: AuthorInput) => {
    createAuthorApollo({ variables: { input: values } })
  }

  const handleOnSubmitBookForm = (values: BookInput) => {
    createBookApollo({ variables: { input: { ...values, bookCover } } })
    console.log(values, bookCover)
  }

  return (
    <div className={s.formWrapper}>
      <AddBookForm
        handleClickAuthorBtn={handleClickAuthorBtn}
        isShowAuthorForm={isShowAuthorForm}
        onSubmitRequest={handleOnSubmitBookForm}
      />
      {isShowAuthorForm && (
        <AddAuthorForm
          handleHideForm={handleHideAuthorForm}
          onSubmitRequest={handleOnSubmitAuthorForm}
        />
      )}
      <DropZone status={!isShowAuthorForm} addLinkToForm={getLinkforUploadedImg} />
      {(!!errorBook || !!errorAuthor) && <Error />}
    </div>
  )
}

export default AddBook

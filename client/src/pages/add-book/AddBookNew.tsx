import { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_AUTHOR, CREATE_BOOK } from 'apollo'
import { AuthorInput, BookInput } from 'types'
import { AddBookForm, AddAuthorForm } from 'components'
import { DropZone, Error, Modal } from 'UI'
import s from './AddBook.module.scss'

const AddBookNew: FC = () => {
  const [createAuthorApollo, { data: newAuthor, error: errorAuthor }] = useMutation(CREATE_AUTHOR)
  const [createBookApollo, { data: newBook, error: errorBook }] = useMutation(CREATE_BOOK)
  const [isShowAuthorForm, setStatusShowAuthorForm] = useState(false)
  const [bookCover, setFieldValue] = useState<string | null>(null)

  const handleClickAuthorBtn = () => {
    setStatusShowAuthorForm((prevState) => !prevState)
  }

  const handleHideAuthorForm = () => {
    setStatusShowAuthorForm(false)
  }

  const getLinkForUploadedImg = (link: string) => {
    setFieldValue(link)
  }

  const handleOnSubmitAuthorForm = (values: AuthorInput) => {
    createAuthorApollo({ variables: { input: values } })
  }

  const handleOnSubmitBookForm = (values: BookInput) => {
    const bookCoverThumbnail =
      bookCover?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323/') || null

    createBookApollo({ variables: { input: { ...values, bookCoverThumbnail, bookCover } } })
    console.log(values, bookCoverThumbnail, bookCover)
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
      <DropZone status={!isShowAuthorForm} addLinkToForm={getLinkForUploadedImg} />
      {!!newAuthor && (
        <Modal
          content={`author ${newAuthor.authorInfo.name} ${newAuthor.authorInfo.surname} was creted`}
        />
      )}
      {!!newBook && (
        <Modal
          content={`book ${newBook.bookInfo.title} was created, author - ${newBook.bookInfo.author.name} ${newBook.bookInfo.author.surname} `}
        />
      )}
      {(!!errorBook || !!errorAuthor) && <Error />}
    </div>
  )
}

export default AddBookNew

import { ReReadBookForm } from 'components'
import { useMutation } from '@apollo/client'
import { CREATE_READ_DATE } from 'apollo'
import { ReadDateInput } from 'types'
import { Error, Modal } from 'UI'

import s from './AddBook.module.scss'

const AddBookReread = () => {
  const [createRereadBookDateApollo, { data: newReadDate, error: errorReadDate }] =
    useMutation(CREATE_READ_DATE)

  const handleOnSubmitReReadBookForm = (values: ReadDateInput) => {
    createRereadBookDateApollo({
      variables: { input: values },
    })
    console.log(values)
  }

  return (
    <div className={s.formWrapperReread}>
      <div className={s.title}>Add new reding date</div>
      <ReReadBookForm onSubmitRequest={handleOnSubmitReReadBookForm} />
      {!!newReadDate && (
        <Modal
          content={`book ${newReadDate.bookInfo.books.title} was read: ${newReadDate.bookInfo.readEnd.day}-${newReadDate.bookInfo.readEnd.month}-${newReadDate.bookInfo.readEnd.year} `}
        />
      )}
      {!!errorReadDate && <Error />}
    </div>
  )
}

export default AddBookReread

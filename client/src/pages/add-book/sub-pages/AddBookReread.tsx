import { Flex } from 'antd'
import { ReReadBookForm } from 'components'
import { useMutation } from '@apollo/client/react'
import { CREATE_READ_DATE } from '__graphql'
import { type ReadDateInput } from '__graphql/__generated__/graphql'
import { Error, Modal } from 'UI'
import s from '../AddBook.module.scss'

export const AddBookReread = () => {
  const [createRereadBookDateApollo, { data: newReadDate, error: errorReadDate, loading }] =
    useMutation(CREATE_READ_DATE)

  const handleOnSubmitReReadBookForm = (values: ReadDateInput) => {
    createRereadBookDateApollo({
      variables: { input: values },
    })
  }

  if (errorReadDate) return <Error />
  if (!!newReadDate?.bookInfo.books && !!newReadDate.bookInfo.readEnd)
    return (
      <Modal
        content={`book ${newReadDate.bookInfo.books.title} was read: ${newReadDate.bookInfo.readEnd.day}-${newReadDate.bookInfo.readEnd.month}-${newReadDate.bookInfo.readEnd.year} `}
      />
    )

  return (
    <Flex vertical gap="large" className={s.wrapper}>
      <div className={s.title}>Add new reding date</div>
      <ReReadBookForm onSubmitRequest={handleOnSubmitReReadBookForm} disabled={loading} />
    </Flex>
  )
}

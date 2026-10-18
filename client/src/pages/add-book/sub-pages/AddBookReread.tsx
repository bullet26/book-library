import { Flex } from 'antd'
import { ReReadBookForm } from 'components'
import { useMutation } from '@apollo/client/react'
import { CREATE_READ_DATE } from '__graphql'
import { type ReadDateInput } from '__graphql/__generated__/graphql'
import { Error, Modal } from 'UI'
import s from '../AddBook.module.scss'
import { useState } from 'react'

export const AddBookReread = () => {
  const [createRereadBookDateApollo, { data, error: errorReadDate, loading }] =
    useMutation(CREATE_READ_DATE)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = async (values: ReadDateInput) => {
    await createRereadBookDateApollo({
      variables: { input: values },
    })

    setIsModalOpen(true)
  }

  if (errorReadDate) return <Error />

  return (
    <>
      <Flex vertical gap="large" className={s.wrapper}>
        <div className={s.title}>Add new reding date</div>
        <ReReadBookForm onSubmitRequest={onSubmit} disabled={loading} />
      </Flex>
      <Modal
        content={`book ${data?.bookInfo.books.title} was read: ${data?.bookInfo.readEnd.day}-${data?.bookInfo.readEnd.month}-${data?.bookInfo.readEnd.year} `}
        open={isModalOpen && !!data}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

import { useState } from 'react'
import { Flex } from 'antd'
import { AdditionalMediaForm } from 'components'
import { useMutation } from '@apollo/client/react'
import { ADD_MEDIA } from '__graphql'
import { type AdditionalMediaInput } from '__graphql/__generated__/graphql'
import { Error, Modal } from 'UI'
import s from '../AddBook.module.scss'

export const AddMediaForBook = () => {
  const [addMediaApollo, { data, error: errorReadDate, loading }] = useMutation(ADD_MEDIA)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = async (values: AdditionalMediaInput[]) => {
    await addMediaApollo({
      variables: { input: values },
    })

    setIsModalOpen(true)
  }

  if (errorReadDate) return <Error />

  return (
    <>
      <Flex vertical gap="large" className={s.wrapper}>
        <div className={s.title}>Add new media for book</div>
        <AdditionalMediaForm onSubmitRequest={onSubmit} disabled={loading} />
      </Flex>
      <Modal
        content={`Book ${data?.bookInfo.title} media was updated`}
        open={isModalOpen && !!data}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

import { AdditionalMediaForm } from 'components'
import { useMutation } from '@apollo/client/react'
import { ADD_MEDIA } from '__graphql'
import { type AdditionalMediaInput } from '__graphql/__generated__/graphql'
import { Error, Modal } from 'UI'
import s from '../AddBook.module.scss'
import { Flex } from 'antd'

export const AddMediaForBook = () => {
  const [addMediaApollo, { data, error: errorReadDate, loading }] = useMutation(ADD_MEDIA)

  const handleOnSubmit = (values: AdditionalMediaInput[]) => {
    addMediaApollo({
      variables: { input: values },
    })
  }

  if (errorReadDate) return <Error />
  if (!!data?.bookInfo?.isAdditionalMediaExist)
    return <Modal content={`Book ${data.bookInfo.title} media was updated`} />

  return (
    <Flex vertical gap="large" className={s.wrapper}>
      <div className={s.title}>Add new media for book</div>
      <AdditionalMediaForm onSubmitRequest={handleOnSubmit} disabled={loading} />
    </Flex>
  )
}

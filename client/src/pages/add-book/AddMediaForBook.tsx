import { AdditionalMediaForm } from 'components'
import { useMutation } from '@apollo/client/react'
import { ADD_MEDIA } from 'apollo'
import { type AdditionalMediaInput } from 'types'
import { Error, Modal } from 'UI'
import s from './AddBook.module.scss'

export const AddMediaForBook = () => {
  const [addMediaApollo, { data, error: errorReadDate }] = useMutation(ADD_MEDIA)

  const handleOnSubmit = (values: AdditionalMediaInput[]) => {
    addMediaApollo({
      variables: { input: values },
    })
  }

  return (
    <div className={s.formWrapperReread}>
      <div className={s.title}>Add new media for book</div>
      <AdditionalMediaForm onSubmitRequest={handleOnSubmit} />
      {!!data?.bookInfo?.isAdditionalMediaExist && (
        <Modal content={`Book ${data.bookInfo.title} media was updated`} />
      )}
      {!!errorReadDate && <Error />}
    </div>
  )
}

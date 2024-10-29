import { FC } from 'react'
import { AdditionalMediaForm } from 'components'
import { useMutation } from '@apollo/client'
import { ADD_MEDIA } from 'apollo'
import { AdditionalMediaInput } from 'types'
import { Error, Modal } from 'UI'
import s from './AddBook.module.scss'

const AddMediaForBook: FC = () => {
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

export default AddMediaForBook

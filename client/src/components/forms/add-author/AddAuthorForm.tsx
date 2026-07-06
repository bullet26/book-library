import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { useMutation } from '@apollo/client/react'
import { CREATE_AUTHOR } from '__graphql'
import { Modal, Error } from 'UI'
import { DropZoneControlled, TextInputControlled } from '../elements'
import { AddAuthorInitialValues, AddAuthorValidationSchema, type AddAuthorFormType } from '../utils'
import s from '../Form.module.scss'

interface AddAuthorFormProps {
  handleHideForm: () => void
}

export const AddAuthorForm = (props: AddAuthorFormProps) => {
  const { handleHideForm } = props

  const [createAuthorApollo, { data, error, loading }] = useMutation(CREATE_AUTHOR)

  const methods = useForm({
    defaultValues: AddAuthorInitialValues,
    resolver: yupResolver(AddAuthorValidationSchema),
  })

  const onSubmit = (values: AddAuthorFormType) => {
    const portraitThumbnail =
      values.portrait?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323,g_face/') || null

    createAuthorApollo({
      variables: {
        input: {
          ...values,
          name: values.name.trim(),
          surname: values.surname.trim(),
          portraitThumbnail,
        },
      },
    })

    methods.reset()
    handleHideForm()
  }

  return (
    <div className={s.addAuthorFormWrapper}>
      <div className={s.title}>Add author</div>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <DropZoneControlled name="portrait" size="small" />
          <TextInputControlled name="name" placeholder="Author name" />
          <TextInputControlled name="surname" placeholder="Author surname" />
          <TextInputControlled name="transcriptionName" placeholder="Author transcription name" />

          <Button
            className={s.submitBtn}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={loading}>
            ADD AUTHOR
          </Button>
        </form>
      </FormProvider>

      {!!data && (
        <Modal content={`author ${data.authorInfo.name} ${data.authorInfo.surname} was creted`} />
      )}

      {!!error && <Error />}
    </div>
  )
}

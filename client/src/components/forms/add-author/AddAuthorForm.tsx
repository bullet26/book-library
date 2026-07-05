import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import { useMutation } from '@apollo/client/react'
import { CREATE_AUTHOR } from '__graphql'
import { DropZone, Modal, Error } from 'UI'
import { AddAuthorInitialValues, AddAuthorValidationSchema, type AddAuthorFormType } from '../utils'
import s from '../Form.module.scss'

interface AddAuthorFormProps {
  handleHideForm: () => void
}

export const AddAuthorForm = (props: AddAuthorFormProps) => {
  const { handleHideForm } = props

  const [createAuthorApollo, { data, error, loading }] = useMutation(CREATE_AUTHOR)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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

    reset()
    handleHideForm()
  }

  return (
    <div className={s.addAuthorFormWrapper}>
      <div className={s.title}>Add author</div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="portrait"
          control={control}
          render={({ field }) => <DropZone {...field} size="small" />}
        />
        {errors.portrait && <div className={s.error}>{errors.portrait.message}</div>}

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="Author name"
              type="text"
              style={{ ...(fieldState.error && { border: '1px solid red' }) }}
            />
          )}
        />
        {errors.name && <div className={s.error}>{errors.name.message}</div>}

        <Controller
          name="surname"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="Author surname"
              type="text"
              style={{ ...(fieldState.error && { border: '1px solid red' }) }}
            />
          )}
        />
        {errors.surname && <div className={s.error}>{errors.surname.message}</div>}

        <Controller
          name="transcriptionName"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="Author transcription name"
              type="text"
              style={{ ...(fieldState.error && { border: '1px solid red' }) }}
            />
          )}
        />
        {errors.transcriptionName && (
          <div className={s.error}>{errors.transcriptionName.message}</div>
        )}

        <Button
          className={s.submitBtn}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={loading}>
          ADD AUTHOR
        </Button>
      </form>
      {!!data && (
        <Modal content={`author ${data.authorInfo.name} ${data.authorInfo.surname} was creted`} />
      )}

      {!!error && <Error />}
    </div>
  )
}

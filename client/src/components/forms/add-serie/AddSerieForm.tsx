import { useMutation } from '@apollo/client/react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import { CREATE_SERIE } from '__graphql'
import { SearchInForm } from 'components'
import { Modal, Error } from 'UI'
import { AddSerieInitialValues, AddSerieValidationSchema, type AddSerieFormType } from '../utils'
import s from '../Form.module.scss'

interface AddSerieFormProps {
  handleHideForm: () => void
}

export const AddSerieForm = (props: AddSerieFormProps) => {
  const { handleHideForm } = props

  const [createSerieApollo, { data, error, loading }] = useMutation(CREATE_SERIE)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSerieFormType>({
    defaultValues: AddSerieInitialValues,
    resolver: yupResolver(AddSerieValidationSchema),
  })

  const onSubmit = (values: AddSerieFormType) => {
    const { authorID, title } = values

    createSerieApollo({ variables: { input: { authorID, title: title.trim() } } })
    reset()
    handleHideForm()
  }

  return (
    <>
      <form className={s.formSeries} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.flexGrowItem}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Serie title"
                type="text"
                style={{ ...(fieldState.error && { border: '1px solid red' }) }}
              />
            )}
          />
          {errors.title && <div className={s.error}>{errors.title.message}</div>}
        </div>

        <div className={s.flexGrowItem}>
          <Controller
            name="authorID"
            control={control}
            render={({ field, fieldState }) => (
              <SearchInForm {...field} status={fieldState.error && 'error'} />
            )}
          />
          {errors.authorID && <div className={s.error}>{errors.authorID.message}</div>}
        </div>

        <Button
          className={s.submitBtn}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={loading}>
          ADD
        </Button>
      </form>
      {!!data && <Modal content={`serie ${data.serieInfo.title} was created`} />}
      {!!error && <Error />}
    </>
  )
}

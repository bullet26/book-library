import { useMutation } from '@apollo/client/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { CREATE_SERIE } from '__graphql'
import { Modal, Error } from 'UI'
import { AddSerieInitialValues, AddSerieValidationSchema, type AddSerieFormType } from '../utils'
import s from '../Form.module.scss'
import { SearchDropdownControlled, TextInputControlled } from '../elements'

interface AddSerieFormProps {
  handleHideForm: () => void
}

export const AddSerieForm = (props: AddSerieFormProps) => {
  const { handleHideForm } = props

  const [createSerieApollo, { data, error, loading }] = useMutation(CREATE_SERIE)

  const methods = useForm<AddSerieFormType>({
    defaultValues: AddSerieInitialValues,
    resolver: yupResolver(AddSerieValidationSchema),
  })

  const onSubmit = (values: AddSerieFormType) => {
    const { authorID, title } = values

    createSerieApollo({ variables: { input: { authorID, title: title.trim() } } })
    methods.reset()
    handleHideForm()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form className={s.formSeries} onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInputControlled name="title" placeholder="Serie title" />
          <SearchDropdownControlled name="authorID" />

          <Button
            className={s.submitBtn}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={loading}>
            ADD
          </Button>
        </form>
      </FormProvider>

      {!!data && <Modal content={`serie ${data.serieInfo.title} was created`} />}
      {!!error && <Error />}
    </>
  )
}

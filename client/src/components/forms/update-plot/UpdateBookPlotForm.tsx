import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client/react'
import { UPDATE_BOOK_PLOT } from '__graphql'
import { Modal, Error } from 'UI'
import { UpdatePlotValidationSchema, type UpdatePlotFormType } from '../utils'
import s from '../Form.module.scss'
import { TextEditorControlled } from '../elements'

interface UpdateBookPlotProps {
  id: string
  plot: string | TrustedHTML
}

export const UpdateBookPlotForm = (props: UpdateBookPlotProps) => {
  const { id, plot } = props

  const { id: bookID = '' } = useParams()

  const methods = useForm<UpdatePlotFormType>({
    defaultValues: {
      id,
      bookID,
      plot: plot.toString(),
    },
    resolver: yupResolver(UpdatePlotValidationSchema),
  })

  const [updatePlotApollo, { data, error, loading }] = useMutation(UPDATE_BOOK_PLOT)

  const onSubmit = (values: UpdatePlotFormType) => {
    updatePlotApollo({
      variables: {
        input: values,
      },
    })
  }

  return (
    <div className={s.addFormWrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={s.form}>
          <TextEditorControlled
            name="plot"
            placeholder="Book plot description"
            editOptions
            style={{
              minHeight: '200px',
              maxHeight: '50vh',
              overflowY: 'auto',
            }}
          />
          <Button
            className={s.submitBtn}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={loading}>
            UPDATE
          </Button>
        </form>
      </FormProvider>
      {!!data && <Modal content={'Book PLOT was UPDATED'} />}
      {!!error && <Error />}
    </div>
  )
}

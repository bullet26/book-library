import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client/react'
import { UPDATE_BOOK_PLOT } from '__graphql'
import { TextEditor, Modal, Error } from 'UI'
import { UpdatePlotValidationSchema, type UpdatePlotFormType } from '../utils'
import s from '../Form.module.scss'

interface UpdateBookPlotProps {
  id: string
  plot: string | TrustedHTML
}

export const UpdateBookPlotForm = (props: UpdateBookPlotProps) => {
  const { id, plot } = props

  const { id: bookID = '' } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePlotFormType>({
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
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name="plot"
          control={control}
          render={({ field, fieldState }) => (
            <TextEditor
              {...field}
              placeholder="Book plot description"
              editOptions={{ color: true, bold: true, italic: true }}
              style={{
                minHeight: '200px',
                maxHeight: '50vh',
                overflowY: 'auto',
                ...(fieldState.error && { border: '1px solid red' }),
              }}
            />
          )}
        />
        {errors.plot && <div className={s.error}>{errors.plot.message}</div>}

        <Button
          className={s.submitBtn}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={loading}>
          UPDATE
        </Button>
      </form>
      {!!data && <Modal content={'Book PLOT was UPDATED'} />}
      {!!error && <Error />}
    </div>
  )
}

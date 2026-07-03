import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { Formik, Form, type FormikHelpers } from 'formik'
import { useMutation } from '@apollo/client/react'
import { UPDATE_BOOK_PLOT } from '__graphql'
import { TextEditor, Modal, Error } from 'UI'
import { validationSchemaUpdatePlot } from '../utils'
import s from '../Form.module.scss'

interface UpdateBookPlotProps {
  id: string
  plot: string
}

interface ValuesUpdatePlotType extends UpdateBookPlotProps {
  bookID: string
}

export const UpdateBookPlotForm = (props: UpdateBookPlotProps) => {
  const { id, plot } = props

  const { id: bookID = '' } = useParams()

  const initialValuesUpdatePlot = {
    id,
    bookID,
    plot,
  }

  const [updatePlotApollo, { data, error, loading }] = useMutation(UPDATE_BOOK_PLOT)

  const onSubmit = (values: ValuesUpdatePlotType) => {
    if (Object.values(values).some((item) => !item)) return

    updatePlotApollo({
      variables: {
        input: values,
      },
    })
  }

  return (
    <div className={s.addFormWrapper}>
      <Formik
        initialValues={initialValuesUpdatePlot}
        validationSchema={validationSchemaUpdatePlot}
        onSubmit={onSubmit}>
        <Form className={s.form}>
          <TextEditor
            placeholder="Book plot description"
            name="plot"
            editOptions={{ color: true, bold: true, italic: true }}
            style={{ minHeight: '200px', maxHeight: '50vh', overflowY: 'auto' }}
          />
          <input type="hidden" name="id" />
          <input type="hidden" name="bookID" />
          <Button
            className={s.submitBtn}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={loading}>
            UPDATE
          </Button>
        </Form>
      </Formik>
      {!!data && <Modal content={'Book PLOT was UPDATED'} />}
      {!!error && <Error />}
    </div>
  )
}

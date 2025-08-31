import { Formik, Form, type FormikHelpers } from 'formik'
import { Button } from 'antd'
import { SearchInForm } from 'components'
import { DatepickerInput } from 'UI'
import { type ReadDateInput } from 'types'
import { initialValuesReReadBook, validationSchemaReReadBook } from '../utils'
import s from '../Form.module.scss'

interface ReReadBookFormProps {
  onSubmitRequest: (values: ReadDateInput) => void
}

type ValueType = typeof initialValuesReReadBook

export const ReReadBookForm = (props: ReReadBookFormProps) => {
  const { onSubmitRequest } = props
  const dateFormat = 'YYYY-MM-DD'

  const onSubmit = (values: ValueType, { resetForm }: FormikHelpers<ValueType>) => {
    const { bookID, readEnd } = values
    if (bookID) {
      onSubmitRequest({ bookID, readEnd: readEnd?.format(dateFormat) })
    }

    resetForm()
  }

  return (
    <Formik
      initialValues={initialValuesReReadBook}
      validationSchema={validationSchemaReReadBook}
      onSubmit={onSubmit}>
      <Form className={s.formReread}>
        <SearchInForm type="books" />
        <DatepickerInput name="readEnd" />
        <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
          ADD REREADING DATE
        </Button>
      </Form>
    </Formik>
  )
}

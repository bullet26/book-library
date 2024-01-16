import { FC } from 'react'
import { Formik, Form } from 'formik'
import { Button } from 'antd'
import { SearchInForm } from 'components'
import { DatepickerInput } from 'UI'
import { ReadDateInput } from 'types'
import { initialValuesReReadBook, validationSchemaReReadBook } from '../utils'
import s from '../Form.module.scss'

interface ReReadBookFormProps {
  onSubmitRequest: (values: ReadDateInput) => void
}

const ReReadBookForm: FC<ReReadBookFormProps> = (props) => {
  const { onSubmitRequest } = props
  const dateFormat = 'YYYY-MM-DD'

  return (
    <Formik
      initialValues={initialValuesReReadBook}
      validationSchema={validationSchemaReReadBook}
      onSubmit={(values, { resetForm }) => {
        const { bookID, readEnd } = values
        if (bookID) {
          onSubmitRequest({ bookID, readEnd: readEnd?.format(dateFormat) })
        }

        resetForm()
      }}>
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

export default ReReadBookForm

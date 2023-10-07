import { FC } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, Form } from 'formik'
import { Button } from 'antd'
import { SearchInForm } from 'components'
import { TextareaInput, DatepickerInput, Input } from 'UI'
import { initialValuesAddBook, validationSchemaAddBook } from '../utils'
import s from '../Form.module.scss'

// author form fields

// name: String
// surname: String!
// portrait: String
// transcriptionName: String

const AddBookForm: FC = () => {
  return (
    <Formik
      initialValues={initialValuesAddBook}
      validationSchema={validationSchemaAddBook}
      onSubmit={(values, { resetForm }) => {
        console.log(JSON.stringify(values, null, 2))
        resetForm()
      }}>
      <Form className={s.form}>
        <Input placeholder="Book title" name="title" />
        <div className={s.innerWrapper}>
          <div className={s.flexGrowItem}>
            <SearchInForm type="authors" />
          </div>
          <div className={s.flexItem}>
            <Button type="default" size="middle">
              Add new author
            </Button>
          </div>
        </div>
        <div className={s.innerWrapper}>
          <Input placeholder="Book rating" name="rating" htmlType="number" />
          <DatepickerInput name="readEnd" />
        </div>
        <div className={s.innerWrapper}>
          <div className={s.flexGrowItem}>
            <SearchInForm type="series" />
          </div>
          <div className={s.flexItem}>
            <Button type="default" size="middle" disabled>
              Add new series
            </Button>
          </div>
          <div className={s.flexItem}>
            <Input placeholder="Book series number" name="seriesNumber" htmlType="number" />
          </div>
        </div>
        <div className={s.innerWrapper}>
          <Input placeholder="Book pages" name="pages" htmlType="number" />
          <Input placeholder="Book notes" name="notes" />
        </div>
        <TextareaInput placeholder="Book annotation (description)" name="description" />
        <TextareaInput placeholder="Book plot description" name="plot" />

        <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
          ADD BOOK
        </Button>
      </Form>
    </Formik>
  )
}

export default AddBookForm

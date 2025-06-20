import { FC } from 'react'
import { useMutation } from '@apollo/client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button } from 'antd'
import { CREATE_SERIE } from 'apollo'
import { SearchInForm } from 'components'
import { Input, Modal, Error } from 'UI'
import { initialValuesAddSerie, validationSchemaAddSerie } from '../utils'
import s from '../Form.module.scss'

interface AddSerieFormProps {
  handleHideForm: () => void
}

type ValueType = typeof initialValuesAddSerie

const AddSerieForm: FC<AddSerieFormProps> = (props) => {
  const { handleHideForm } = props

  const [createSerieApollo, { data, error }] = useMutation(CREATE_SERIE)

  const onSubmit = (values: ValueType, { resetForm }: FormikHelpers<ValueType>) => {
    const { author, ...filteredValues } = values

    createSerieApollo({ variables: { input: filteredValues } })
    resetForm()
    handleHideForm()
  }

  return (
    <>
      <Formik
        initialValues={initialValuesAddSerie}
        validationSchema={validationSchemaAddSerie}
        onSubmit={onSubmit}>
        <Form className={s.formSeries}>
          <div className={s.flexGrowItem}>
            <Input placeholder="Serie title" name="title" />
          </div>
          <div className={s.flexGrowItem}>
            <SearchInForm type="authors" />
          </div>
          <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
            ADD
          </Button>
        </Form>
      </Formik>
      {!!data && <Modal content={`serie ${data.serieInfo.title} was created`} />}
      {!!error && <Error />}
    </>
  )
}

export default AddSerieForm

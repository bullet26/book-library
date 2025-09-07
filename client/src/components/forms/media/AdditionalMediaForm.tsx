import { useState } from 'react'
import { Formik, Form, type FormikHelpers } from 'formik'
import { Button } from 'antd'
import { SearchInForm } from 'components'
import { initialValuesMedia, validationSchemaMedia } from '../utils'
import { UploadMediaBlock } from './elements'
import { MediaType, type AdditionalMediaInput } from '__graphql/__generated__/graphql'
import s from '../Form.module.scss'

interface AdditionalMediaFormProps {
  onSubmitRequest: (values: AdditionalMediaInput[]) => void
}

type ValueType = typeof initialValuesMedia

export const AdditionalMediaForm = (props: AdditionalMediaFormProps) => {
  const { onSubmitRequest } = props

  const [imageURLs, setImageFieldValue] = useState<string[]>([])

  const getLinkForUploadedImg = (links: string[]) => {
    setImageFieldValue(links)
  }

  const onSubmit = (values: ValueType, { resetForm }: FormikHelpers<ValueType>) => {
    const { bookID, url, type } = values

    if (!bookID || typeof bookID !== 'string') {
      return
    }

    if (type === MediaType.Video && url) {
      onSubmitRequest([{ url, type, bookID }])
    }

    if (type === MediaType.Image) {
      const formValues = imageURLs.map((item) => {
        return { url: item, type, bookID }
      })
      onSubmitRequest(formValues)
    }

    resetForm()
    setImageFieldValue([])
  }

  return (
    <Formik
      initialValues={initialValuesMedia}
      validationSchema={validationSchemaMedia}
      onSubmit={onSubmit}>
      <Form className={s.formReread}>
        <SearchInForm type="books" />
        <UploadMediaBlock addLinkToForm={getLinkForUploadedImg} />

        <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
          ADD
        </Button>
      </Form>
    </Formik>
  )
}

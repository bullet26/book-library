import { FC, useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button } from 'antd'
import { SearchInForm } from 'components'
import { AdditionalMediaInput, MediaType } from 'types'
import { initialValuesMedia, validationSchemaMedia } from '../utils'
import { UploadMediaBlock } from './elements'
import s from '../Form.module.scss'

interface AdditionalMediaFormProps {
  onSubmitRequest: (values: AdditionalMediaInput[]) => void
}

type ValueType = typeof initialValuesMedia

const AdditionalMediaForm: FC<AdditionalMediaFormProps> = (props) => {
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

    if (type === MediaType.VIDEO && url) {
      console.log(type, url)

      onSubmitRequest([{ url, type, bookID }])
    }

    if (type === MediaType.IMAGE) {
      console.log(type, type === MediaType.IMAGE, values, imageURLs)

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

export default AdditionalMediaForm

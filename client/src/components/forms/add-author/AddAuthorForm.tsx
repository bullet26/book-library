import { FC, useState } from 'react'
import { Formik, Form } from 'formik'
import { Button } from 'antd'
import { AuthorInput } from 'types'
import { Input, DropZone } from 'UI'
import { initialValuesAddAuthor, validationSchemaAddAuthor } from '../utils'
import s from '../Form.module.scss'

interface AddAuthorFormProps {
  handleHideForm: () => void
  onSubmitRequest: (values: AuthorInput) => void
}

const AddAuthorForm: FC<AddAuthorFormProps> = (props) => {
  const { handleHideForm, onSubmitRequest } = props
  const [portrait, setFieldValue] = useState<string | null>(null)

  const getLinkforUploadedImg = (link: string) => {
    setFieldValue(link)
  }

  return (
    <div className={s.addFormWrapper}>
      <div className={s.title}>Add author</div>
      <Formik
        initialValues={initialValuesAddAuthor}
        validationSchema={validationSchemaAddAuthor}
        onSubmit={(values, { resetForm }) => {
          const portraitThumbnail =
            portrait?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323,g_face') || null
          onSubmitRequest({ ...values, portraitThumbnail, portrait })

          resetForm()
          handleHideForm()
        }}>
        <Form className={s.form}>
          <DropZone size="small" addLinkToForm={getLinkforUploadedImg} />
          <Input placeholder="Author name" name="name" />
          <Input placeholder="Author surname" name="surname" />
          <Input placeholder="Author transcription name" name="transcriptionName" />
          <input type="hidden" name="portrait" />
          <input type="hidden" name="portraitThumbnail" />
          <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
            ADD AUTHOR
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddAuthorForm

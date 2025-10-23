import { useState } from 'react'
import { Formik, Form, type FormikHelpers } from 'formik'
import { Button } from 'antd'
import { useMutation } from '@apollo/client/react'
import { CREATE_AUTHOR } from '__graphql'
import { Input, DropZone, Modal, Error } from 'UI'
import { initialValuesAddAuthor, validationSchemaAddAuthor } from '../utils'
import s from '../Form.module.scss'

interface AddAuthorFormProps {
  handleHideForm: () => void
}

type ValueType = typeof initialValuesAddAuthor

export const AddAuthorForm = (props: AddAuthorFormProps) => {
  const { handleHideForm } = props

  const [createAuthorApollo, { data, error }] = useMutation(CREATE_AUTHOR)

  const [portrait, setFieldValue] = useState<string | null>(null)

  const getLinkForUploadedImg = (link: string) => {
    setFieldValue(link)
  }

  const onSubmit = (values: ValueType, { resetForm }: FormikHelpers<ValueType>) => {
    const portraitThumbnail =
      portrait?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323,g_face/') || null

    createAuthorApollo({
      variables: {
        input: {
          ...values,
          name: values.name.trim(),
          surname: values.surname.trim(),
          portraitThumbnail,
          portrait,
        },
      },
    })

    resetForm()
    handleHideForm()
  }

  return (
    <div className={s.addFormWrapper}>
      <div className={s.title}>Add author</div>
      <Formik
        initialValues={initialValuesAddAuthor}
        validationSchema={validationSchemaAddAuthor}
        onSubmit={onSubmit}>
        <Form className={s.form}>
          <DropZone size="small" addLinkToForm={getLinkForUploadedImg} />
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
      {!!data && (
        <Modal content={`author ${data.authorInfo.name} ${data.authorInfo.surname} was creted`} />
      )}

      {!!error && <Error />}
    </div>
  )
}

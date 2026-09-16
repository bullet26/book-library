import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { MediaInitialValues, MediaValidationSchema, type MediaFormType } from '../utils'
import { MediaType } from '__graphql/__generated__/enums'
import type { AdditionalMediaInput } from '__graphql/__generated__/graphql'
import { SearchDropdownControlled } from '../elements'
import { ChooseMediaTypeControlled, UploadMediaControlled } from './elements'
import s from '../Form.module.scss'

interface AdditionalMediaFormProps {
  onSubmitRequest: (values: AdditionalMediaInput[]) => void
  disabled?: boolean
}

export const AdditionalMediaForm = (props: AdditionalMediaFormProps) => {
  const { onSubmitRequest, disabled } = props

  const [isPictureLoading, setIsPictureLoading] = useState(false)

  const methods = useForm<MediaFormType>({
    defaultValues: MediaInitialValues,
    resolver: yupResolver(MediaValidationSchema),
  })

  const onSubmit = (values: MediaFormType) => {
    const { bookID, url, type } = values

    if (type === MediaType.Video && typeof url === 'string') {
      onSubmitRequest([{ url, type, bookID }])
    }

    if (type === MediaType.Image && Array.isArray(url)) {
      const formValues = url.map((singleUrl) => {
        return { url: singleUrl, type, bookID }
      })
      onSubmitRequest(formValues)
    }

    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <SearchDropdownControlled name="bookID" />
        <ChooseMediaTypeControlled name="type" />
        <UploadMediaControlled name="url" onLoadingChange={setIsPictureLoading} />

        <Button
          className={s.submitBtn}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={disabled || isPictureLoading}>
          ADD
        </Button>
      </form>
    </FormProvider>
  )
}

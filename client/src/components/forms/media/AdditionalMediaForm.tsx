import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { MediaInitialValues, MediaValidationSchema, type MediaFormType } from '../utils'
import { MediaType } from '__graphql/__generated__/enums'
import type { AdditionalMediaInput } from '__graphql/__generated__/graphql'
import s from '../Form.module.scss'
import { RadioGroupControlled, SearchDropdownControlled, UploadMediaControlled } from '../elements'

interface AdditionalMediaFormProps {
  onSubmitRequest: (values: AdditionalMediaInput[]) => void
}

export const AdditionalMediaForm = (props: AdditionalMediaFormProps) => {
  const { onSubmitRequest } = props

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
      <form className={s.formReread} onSubmit={methods.handleSubmit(onSubmit)}>
        <SearchDropdownControlled name="bookID" />
        <RadioGroupControlled name="type" />
        <UploadMediaControlled name="url" />

        <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
          ADD
        </Button>
      </form>
    </FormProvider>
  )
}

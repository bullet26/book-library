import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Radio, Upload, type UploadProps } from 'antd'
import { SearchInForm } from 'components'
import { MediaInitialValues, MediaValidationSchema, type MediaFormType } from '../utils'
import { MediaType } from '__graphql/__generated__/enums'
import type { AdditionalMediaInput } from '__graphql/__generated__/graphql'
import { beforeUpload } from './utils'
import { UploadOutlined } from '@ant-design/icons'
import s from '../Form.module.scss'

interface AdditionalMediaFormProps {
  onSubmitRequest: (values: AdditionalMediaInput[]) => void
}

export const AdditionalMediaForm = (props: AdditionalMediaFormProps) => {
  const { onSubmitRequest } = props

  const baseURL = import.meta.env.VITE_REST_API_BASE_URL

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MediaFormType>({
    defaultValues: MediaInitialValues,
    resolver: yupResolver(MediaValidationSchema),
  })

  const currentType = watch('type')

  const handleUploadChange = (
    info: Parameters<NonNullable<UploadProps['onChange']>>[0],
    onChange: (v: string | string[]) => void,
  ) => {
    const uploadedUrls = info.fileList
      .filter((file) => file.response?.data?.image)
      .map((file) => file.response.data.image)

    onChange(uploadedUrls)
  }

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

    reset()
  }

  return (
    <form className={s.formReread} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="bookID"
        control={control}
        render={({ field, fieldState }) => (
          <SearchInForm {...field} status={fieldState.error && 'error'} />
        )}
      />
      {errors.bookID && <div className={s.error}>{errors.bookID.message}</div>}

      <Controller
        name="type"
        control={control}
        render={({ field: { value, onChange, ...fields } }) => (
          <Radio.Group {...fields} onChange={(e) => onChange(e.target.value)} value={value}>
            <Radio value={MediaType.Video}>video</Radio>
            <Radio value={MediaType.Image}>images</Radio>
          </Radio.Group>
        )}
      />
      {errors.type && <div className={s.error}>{errors.type.message}</div>}

      <Controller
        name="url"
        control={control}
        render={({ field: { value, onChange, ...fields }, fieldState }) => (
          <>
            {currentType === MediaType.Video && (
              <Input
                {...fields}
                type="text"
                placeholder="Video URL"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ ...(fieldState.error && { border: '1px solid red' }) }}
              />
            )}
            {currentType === MediaType.Image && (
              <Upload
                {...fields}
                name="file"
                listType="picture"
                maxCount={10}
                multiple
                action={`${baseURL}/upload`}
                onChange={(info) => handleUploadChange(info, onChange)}
                beforeUpload={beforeUpload}>
                <Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>
              </Upload>
            )}
          </>
        )}
      />
      {errors.url && <div className={s.error}>{errors.url.message}</div>}
      <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
        ADD
      </Button>
    </form>
  )
}

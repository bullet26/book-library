import { MediaType } from '__graphql/__generated__/enums'
import { Button, Input, Upload, type UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useController, useWatch } from 'react-hook-form'
import { beforeUpload } from '../media/utils'
import s from '../Form.module.scss'

interface UploadMediaControlledProps {
  name: string
}

export const UploadMediaControlled = (props: UploadMediaControlledProps) => {
  const { name } = props

  const baseURL = import.meta.env.VITE_REST_API_BASE_URL

  const {
    field: { value, onChange, ...fields },
    fieldState,
  } = useController({ name })

  const currentType = useWatch({ name: 'type' })

  const handleUploadChange = (info: Parameters<NonNullable<UploadProps['onChange']>>[0]) => {
    const uploadedUrls = info.fileList
      .filter((file) => file.response?.data?.image)
      .map((file) => file.response.data.image)

    onChange(uploadedUrls)
  }

  return (
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
          onChange={(info) => handleUploadChange(info)}
          beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>
        </Upload>
      )}
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

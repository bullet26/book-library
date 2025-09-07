import { Button, Radio, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { type UploadProps } from 'antd/es/upload'
import { useField } from 'formik'
import { Input } from 'UI'
import { MediaType } from '__graphql/__generated__/graphql'
import { beforeUpload } from './utils'

interface DropZoneProps {
  addLinkToForm: (links: string[]) => void
}

export const UploadMediaBlock = (props: DropZoneProps) => {
  const { addLinkToForm } = props

  const baseURL = import.meta.env.VITE_REST_API_BASE_URL

  const [field, , helpers] = useField('type')

  const onChangeType = (value: MediaType) => {
    helpers.setValue(value)
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    const newFileList = [...info.fileList]

    const urls: string[] = []

    newFileList.forEach((file) => {
      if (file.response) {
        urls.push(file.response.data.image)
      }
    })

    addLinkToForm(urls)
  }

  return (
    <>
      <Radio.Group onChange={(e) => onChangeType(e.target.value)} value={field.value}>
        <Radio value={MediaType.Video}>video</Radio>
        <Radio value={MediaType.Image}>images</Radio>
      </Radio.Group>
      {field.value === MediaType.Video && <Input placeholder="Insert video link" name="url" />}
      {field.value === MediaType.Image && (
        <Upload
          listType="picture"
          maxCount={10}
          multiple
          action={`${baseURL}/upload`}
          onChange={handleChange}
          beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>
          <input type="hidden" name="portrait" />
        </Upload>
      )}
    </>
  )
}

import { FC, useState } from 'react'
import { Button, Radio, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { RcFile, UploadProps } from 'antd/es/upload'
import ky from 'ky'
import { useField } from 'formik'
import { Input, Error } from 'UI'
import { MediaType } from 'types'
import { beforeUpload } from './utils'

interface DropZoneProps {
  addLinkToForm: (links: string[]) => void
}

const UploadMediaBlock: FC<DropZoneProps> = (props) => {
  const { addLinkToForm } = props

  const baseURL = import.meta.env.VITE_REST_API_BASE_URL

  const [field, , helpers] = useField('type')
  const [error, setError] = useState(false)

  const onChangeType = (value: MediaType) => {
    helpers.setValue(value)
  }

  const handleUploadImage = async (file: string | RcFile | Blob) => {
    if (typeof file === 'string') {
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response: { data: { image: string }; messge: string } = await ky
        .post(`${baseURL}/upload`, { body: formData })
        .json()

      addLinkToForm(response.data.image)
    } catch (e) {
      setError(true)
    }
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

  //  action={`${baseURL}/upload`}

  // customRequest={({ file }) => {
  //   handleUploadImage(file)
  // }}

  return (
    <>
      <Radio.Group onChange={(e) => onChangeType(e.target.value)} value={field.value}>
        <Radio value={MediaType.VIDEO}>video</Radio>
        <Radio value={MediaType.IMAGE}>images</Radio>
      </Radio.Group>
      {field.value === MediaType.VIDEO && <Input placeholder="Insert video link" name="url" />}
      {field.value === MediaType.IMAGE && (
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
      {/* {!!error && <Error />} */}
    </>
  )
}

export default UploadMediaBlock

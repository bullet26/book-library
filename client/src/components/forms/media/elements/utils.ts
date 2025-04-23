import { GetProp, UploadProps, message } from 'antd'

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export const beforeUpload = (file: FileType) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/avif',
  ]

  const isJpgOrPng = allowedTypes.includes(file.type)
  if (!isJpgOrPng) {
    message.error('You can upload only jpeg, png, webp, gif, bmp, and avif!')
  }
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error('Image size must be less 5 Mb!')
  }
  return isJpgOrPng && isLt2M
}

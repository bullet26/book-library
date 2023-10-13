import { Button } from 'antd'
import { FC, useState, useRef, DragEvent, ChangeEvent } from 'react'
import ky from 'ky'
import { Error } from 'UI'
import s from './DropZone.module.scss'

interface DropZoneProps {
  size?: 'small' | 'medium'
  status?: boolean
  addLinkToForm: (link: string) => void
}

const DropZone: FC<DropZoneProps> = (props) => {
  const { size = 'medium', status = true, addLinkToForm } = props

  const [fileURL, setFileURL] = useState('')
  const [file, setFile] = useState<Blob | string>('')
  const [text, setText] = useState('Drag and Drop here or click')
  const [error, setError] = useState(false)

  const dropzoneRef = useRef<HTMLDivElement>(null)

  const handleClickDropZone = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setFileURL(URL.createObjectURL(event.target.files[0]))
    }
    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setText('Drop file here')
    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
      dropzoneRef.current.style.backgroundColor = 'lightgray'
      dropzoneRef.current.style.color = '#000'
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if (dropzoneRef.current) {
      dropzoneRef.current.style.backgroundColor = ''
      dropzoneRef.current.style.color = ''
    }

    if (event.dataTransfer?.files.length) {
      setFile(event.dataTransfer.files[0])
      setFileURL(URL.createObjectURL(event.dataTransfer.files[0]))
    }
  }

  const handleCancel = () => {
    setText('Drag and Drop here or click')
    setFile('')
    setFileURL('')

    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
    }
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('bookCover', file)

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL
      const response: { data: { image: string }; messge: string } = await ky
        .post(`${baseURL}upload`, { body: formData })
        .json()

      addLinkToForm(response.data.image)

      if (dropzoneRef.current) {
        dropzoneRef.current.style.border = '3px solid green'
      }
    } catch (e) {
      setError(true)
    }
  }

  return (
    <div className={`${s.wrapper} ${size === 'small' && s.wrapperSmall} ${!status && s.hide}`}>
      <label htmlFor="bookCover">
        <div
          className={s.dropZonewrapper}
          ref={dropzoneRef}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}>
          {fileURL ? <img src={fileURL} alt="book cover" /> : text}
        </div>
      </label>
      <input
        type="file"
        id="bookCover"
        name="bookCover"
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={(e) => handleClickDropZone(e)}
      />
      <div className={s.buttonWrapper}>
        <Button
          type="default"
          size="middle"
          onClick={() => {
            handleCancel()
          }}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            handleUpload()
          }}>
          Upload
        </Button>
      </div>
      {!!error && <Error />}
    </div>
  )
}

export default DropZone

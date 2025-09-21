import { Button, Input, Radio } from 'antd'
import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import ky from 'ky'
import { Error } from 'UI'
import s from './DropZone.module.scss'

interface DropZoneProps {
  size?: 'small' | 'medium'
  status?: boolean
  addLinkToForm: (link: string) => void
}

export const DropZone = (props: DropZoneProps) => {
  const { size = 'medium', status = true, addLinkToForm } = props

  const [fileURL, setFileURL] = useState('')
  const [file, setFile] = useState<Blob | string>('')
  const [text, setText] = useState('Drag and Drop here or click')
  const [error, setError] = useState(false)
  const [source, setSource] = useState<'link' | 'PC'>('PC')

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
    formData.append('file', file)

    try {
      const baseURL = import.meta.env.VITE_REST_API_BASE_URL
      const response: { data: { image: string }; message: string } = await ky
        .post(`${baseURL}/upload`, { body: formData })
        .json()

      addLinkToForm(response.data.image)

      if (dropzoneRef.current) {
        dropzoneRef.current.style.border = '3px solid green'
      }
    } catch (e) {
      setError(true)
    }
  }

  const onPasteLink = (link: string) => {
    addLinkToForm(link)
    setFileURL(link)
  }

  return (
    <div className={`${s.wrapper} ${size === 'small' && s.wrapperSmall} ${!status && s.hide}`}>
      <Radio.Group
        onChange={(e) => setSource(e.target.value)}
        value={source}
        className={s.radioGroup}>
        <Radio value="PC">from PC</Radio>
        <Radio value="link">paste link</Radio>
      </Radio.Group>
      {source === 'PC' && (
        <>
          <label htmlFor="bookCover">
            <div
              className={s.dropZoneWrapper}
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
            accept=".jpg, .jpeg, .png, .webp"
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
        </>
      )}
      {source === 'link' && (
        <Input
          className={s.input}
          value={fileURL}
          onChange={(e) => onPasteLink(e.target.value)}
          placeholder="paste link to image"
        />
      )}
      {!!error && <Error />}
    </div>
  )
}

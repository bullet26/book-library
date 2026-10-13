import { useEffect } from 'react'
import { Modal as AntModal } from 'antd'

interface ModalProps {
  content: string
  open: boolean
  onClose: () => void
}

export const Modal = (props: ModalProps) => {
  const { content, open, onClose } = props

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose()
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <AntModal title="Success" centered open={open} onOk={onClose} onCancel={onClose}>
      {content}
    </AntModal>
  )
}

import { useState, useEffect } from 'react'
import { Modal as AntModal } from 'antd'

interface ModalProps {
  content: string
}

export const Modal = (props: ModalProps) => {
  const { content } = props

  const [modalOpenStatus, setModalOpenStatus] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalOpenStatus(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <AntModal
      title="Success"
      centered
      open={modalOpenStatus}
      onOk={() => setModalOpenStatus(false)}>
      {content}
    </AntModal>
  )
}

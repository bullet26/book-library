import { FC, useState, useEffect } from 'react'
import { Modal as AntModal } from 'antd'

interface ModalProps {
  content: string
}

const Modal: FC<ModalProps> = (props) => {
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

export default Modal

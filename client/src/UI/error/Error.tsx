import { useEffect, useState } from 'react'
import { errorImg } from 'assets'
import s from './Error.module.scss'

interface ErrorProps {
  message?: string
}

const Error = (props: ErrorProps) => {
  const { message } = props
  const [show, setShowStatus] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowStatus(false), 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    show && (
      <div className={s.wrapper}>
        <img src={errorImg} alt="error-img" />
        <div className={s.text}>{message || 'Something went wrong'}</div>
      </div>
    )
  )
}

export default Error

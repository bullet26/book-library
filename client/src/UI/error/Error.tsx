import { FC } from 'react'
import { errorImg } from 'assets'
import s from './Error.module.scss'

interface ErrorProps {
  message?: string
}

const Error: FC<ErrorProps> = (props) => {
  const { message } = props

  return (
    <div className={s.wrapper}>
      <img src={errorImg} alt="error-img" />
      <div className={s.text}>{message || 'Something went wrong'}</div>
    </div>
  )
}

export default Error

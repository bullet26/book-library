import s from './DateDivider.module.scss'

interface DateDividerProps {
  message: string
}

const DateDivider = (props: DateDividerProps) => {
  const { message } = props

  return <div className={s.wrapper}>{message}</div>
}

export default DateDivider

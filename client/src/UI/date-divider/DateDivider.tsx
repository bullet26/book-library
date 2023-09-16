import s from './DateDivider.module.scss'

interface DateDividerProps {
  message: string
  type?: 'main' | 'ordinary'
}

const DateDivider = (props: DateDividerProps) => {
  const { message, type = 'ordinary' } = props

  return <div className={`${s.wrapper} ${type === 'main' && s.main}`}>{message}</div>
}

export default DateDivider

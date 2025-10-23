import { type RefObject } from 'react'
import { useField } from 'formik'
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable'
import s from './Input.module.scss'
import { sanitize } from 'utils'

interface InputProps {
  name: string
  style?: object
  placeholder?: string
  disabled?: boolean
  innerRef?: RefObject<HTMLElement>
}

export const InputFromEditableDiv = (props: InputProps) => {
  const { style, name, placeholder, innerRef, disabled } = props
  const [field, meta, helpers] = useField(name)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    const sanitizedValue = sanitize(value)
    helpers.setValue(sanitizedValue, true)
  }

  return (
    <div className={s.inputDivWrapper}>
      <ContentEditable
        tagName="div"
        html={field.value || ''}
        className={s.inputDiv}
        data-placeholder={placeholder}
        style={style}
        onChange={onChange}
        innerRef={innerRef}
        disabled={disabled}
      />

      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}

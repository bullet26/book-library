/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { FC, RefObject } from 'react'
import { useField } from 'formik'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import s from './Input.module.scss'

interface InputProps {
  name: string
  style?: object
  placeholder?: string
  disabled?: boolean
  innerRef?: RefObject<HTMLElement>
}

export const InputFromEditableDiv: FC<InputProps> = (props) => {
  const { style, name, placeholder, innerRef, disabled } = props
  const [field, meta, helpers] = useField(name)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    helpers.setValue(value, true)
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

import { type RefObject } from 'react'
import { useField } from 'formik'
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable'
import { sanitize } from 'utils'
import { EditBlock, type EditButtonsProps } from './EditButtons'
import s from './TextEditor.module.scss'

interface TextEditorProps {
  name: string
  style?: object
  placeholder?: string
  disabled?: boolean
  innerRef?: RefObject<HTMLElement>
  editOptions?: EditButtonsProps
}

const ContentEditableComponent = (ContentEditable as any).default || ContentEditable

export const TextEditor = (props: TextEditorProps) => {
  const { style, name, placeholder, innerRef, disabled, editOptions } = props
  const [field, meta, helpers] = useField(name)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    const sanitizedValue = sanitize(value)
    helpers.setValue(sanitizedValue, true)
  }

  return (
    <div className={s.editorWrapper}>
      {editOptions && <EditBlock {...editOptions} />}
      <ContentEditableComponent
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

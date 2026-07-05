import { type RefObject } from 'react'
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable'
import { sanitize } from 'utils'
import { EditBlock, type EditButtonsProps } from './EditButtons'
import s from './TextEditor.module.scss'

interface TextEditorProps {
  style?: object
  placeholder?: string
  disabled?: boolean
  innerRef?: RefObject<HTMLElement>
  editOptions?: EditButtonsProps
  value: string | null
  onChange: (v: string) => void
}

const ContentEditableComponent = (ContentEditable as any).default || ContentEditable

export const TextEditor = (props: TextEditorProps) => {
  const { value, onChange, style, placeholder, innerRef, disabled, editOptions } = props

  const handleChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    const sanitizedValue = sanitize(value).toString()
    onChange(sanitizedValue)
  }

  return (
    <div className={s.editorWrapper}>
      {editOptions && <EditBlock {...editOptions} />}
      <ContentEditableComponent
        tagName="div"
        html={value || ''}
        className={s.inputDiv}
        data-placeholder={placeholder}
        style={style}
        onChange={handleChange}
        innerRef={innerRef}
        disabled={disabled}
      />
    </div>
  )
}

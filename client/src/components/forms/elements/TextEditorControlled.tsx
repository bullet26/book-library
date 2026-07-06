import type { CSSProperties } from 'react'
import { useController } from 'react-hook-form'
import { TextEditor } from 'UI'
import s from '../Form.module.scss'

interface TextEditorControlledProps {
  name: string
  editOptions?: boolean
  style?: CSSProperties
  placeholder?: string
}

export const TextEditorControlled = (props: TextEditorControlledProps) => {
  const { name, style, editOptions, placeholder } = props

  const { field, fieldState } = useController({ name })

  return (
    <>
      <TextEditor
        {...field}
        placeholder={placeholder}
        editOptions={{ ...(editOptions && { color: true, bold: true, italic: true }) }}
        style={{ ...style, ...(fieldState.error && { border: '1px solid red' }) }}
      />
      {fieldState.error && <div className={s.error}>{fieldState.error?.message}</div>}
    </>
  )
}

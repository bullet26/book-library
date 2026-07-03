import { type MouseEvent, useRef, useState } from 'react'
import { Button, ColorPicker, type ColorPickerProps, type GetProp } from 'antd'
import s from './TextEditor.module.scss'
import { EditFilled } from '@ant-design/icons'

export interface EditButtonsProps {
  color?: boolean
  bold?: boolean
  italic?: boolean
}

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>

export const EditBlock = (props: EditButtonsProps) => {
  const { color: isShowColor, bold, italic } = props

  const [color, setColor] = useState('purple')

  const execCommand = (command: string, value?: any) => document.execCommand(command, false, value)

  const changeColor = (color: Color) => {
    const colorHEX = typeof color === 'string' ? color : color!.toHexString()
    setColor(colorHEX)
    execCommand('styleWithCSS', true) // true modifies/generates style attributes in markup, false generates presentational elements.
    execCommand('foreColor', colorHEX)
  }

  const applyColor = (e: MouseEvent) => {
    e.preventDefault()
    execCommand('styleWithCSS', true)
    execCommand('foreColor', color)
  }

  const toggleBold = (e: MouseEvent) => {
    e.preventDefault()
    execCommand('bold')
  }

  const toggleItalic = (e: MouseEvent) => {
    e.preventDefault()
    execCommand('italic')
  }

  return (
    <div className={s.editOptionsWrapper}>
      {isShowColor && (
        <>
          <ColorPicker value={color} onChange={changeColor} />
          <Button
            variant="solid"
            size="middle"
            icon={<EditFilled />}
            style={{ backgroundColor: color, maxHeight: '26px' }}
            onMouseDown={applyColor}></Button>
        </>
      )}
      {bold && (
        <Button
          type="default"
          size="middle"
          onMouseDown={toggleBold}
          style={{ fontWeight: 'bold' }}>
          Bold
        </Button>
      )}
      {italic && (
        <Button
          type="default"
          size="middle"
          onMouseDown={toggleItalic}
          style={{ fontStyle: 'italic' }}>
          Italic
        </Button>
      )}
    </div>
  )
}

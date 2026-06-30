import { type MouseEvent, useRef } from 'react'
import { Button, ColorPicker, type ColorPickerProps, type GetProp } from 'antd'
import s from './TextEditor.module.scss'

export interface EditButtonsProps {
  color?: boolean
  bold?: boolean
}

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>

export const EditBlock = (props: EditButtonsProps) => {
  const { color, bold } = props
  const savedRangeRef = useRef<Range | null>(null)

  const execCommand = (command: string, value?: any) => document.execCommand(command, false, value)

  const saveSelection = (e?: MouseEvent) => {
    if (e) e.preventDefault()

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      savedRangeRef.current = selection.getRangeAt(0).cloneRange()
    }
  }

  const restoreSelection = () => {
    const selection = window.getSelection()
    if (selection && savedRangeRef.current) {
      selection.removeAllRanges()
      selection.addRange(savedRangeRef.current)
    }
  }

  const changeColor = (color: Color) => {
    const colorHEX = typeof color === 'string' ? color : color!.toHexString()
    restoreSelection()

    execCommand('styleWithCSS', true) // true modifies/generates style attributes in markup, false generates presentational elements.
    execCommand('foreColor', colorHEX)

    // saveSelection() // TODO need fix, because after changing color, the selection is lost and the next color change will not work correctly.
  }

  const toggleBold = (e: MouseEvent) => {
    e.preventDefault()
    execCommand('bold')
  }

  return (
    <div className={s.editOptionsWrapper}>
      {color && (
        <ColorPicker defaultValue="purple" onChange={changeColor}>
          <Button type="default" onMouseDown={saveSelection}>
            Color
          </Button>
        </ColorPicker>
      )}
      {bold && (
        <Button type="default" size="middle" onMouseDown={toggleBold}>
          Bold
        </Button>
      )}
    </div>
  )
}

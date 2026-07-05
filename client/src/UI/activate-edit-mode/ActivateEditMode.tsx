import { useState, type ChangeEvent } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useReactActions, useReactContext } from 'providers'
import { AddBookButton } from 'UI'
import s from './ActivateEditMode.module.scss'

const { Password } = Input

export const ActivateEditMode = () => {
  const editPass = import.meta.env.VITE_EDIT_MODE_PASSWORD

  const { setEditModeStatus } = useReactActions()
  const { isEditMode } = useReactContext()

  const [userPass, setUserPass] = useState('password')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUserPass(e.target.value)

  const onSubmit = () => {
    const isEditMode = userPass === editPass
    if (isEditMode) setEditModeStatus(isEditMode)
  }

  return (
    <>
      {isEditMode ? (
        <AddBookButton />
      ) : (
        <div className={s.editBlock}>
          <Password size="medium" name="password-fn" value={userPass} onChange={onChange} />
          <Button icon={<CheckOutlined />} onClick={onSubmit} />
        </div>
      )}
    </>
  )
}

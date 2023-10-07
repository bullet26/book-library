import { FC } from 'react'
import { Button as AntButton } from 'antd'
import { useNavigate } from 'react-router-dom'

const Button: FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/add')
  }

  return (
    <AntButton type="default" shape="round" size="middle" onClick={handleClick}>
      Add book
    </AntButton>
  )
}

export default Button

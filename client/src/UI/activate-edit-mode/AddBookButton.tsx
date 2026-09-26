import { Button as AntButton } from 'antd'
import { useNavigate } from 'react-router-dom'

export const AddBookButton = () => {
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

import { FC, useEffect } from 'react'
import { Tabs } from 'antd'
import { useNavigate } from 'react-router-dom'

const NavigationHeader: FC = () => {
  const navigate = useNavigate()
  const defultKey = window.location.pathname.split('/').at(1)

  const onChange = (key: string) => {
    navigate(`/${key}`)
  }

  useEffect(() => {
    if (!defultKey) {
      navigate('/home')
    }
  }, [defultKey])

  return (
    <Tabs
      onChange={onChange}
      defaultActiveKey={defultKey}
      activeKey={defultKey}
      type="card"
      items={[
        {
          label: 'Home',
          key: 'home',
        },
        {
          label: 'Books',
          key: 'books',
        },
        {
          label: 'Authors',
          key: 'authors',
        },
      ]}
    />
  )
}

export default NavigationHeader

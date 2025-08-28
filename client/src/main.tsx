import '@ant-design/v5-patch-for-react-19'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeConfig } from 'theme/createTheme'
import { client } from 'apollo'
import { AppRoutes } from 'routes'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={ThemeConfig}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
)

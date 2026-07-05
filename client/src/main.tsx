import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeConfig } from 'theme/createTheme'
import { client } from '__graphql'
import { AppRoutes } from 'routes'
import { HelmetProvider } from 'react-helmet-async'
import { ContextProvider } from 'providers'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={ThemeConfig}>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ContextProvider>
      </HelmetProvider>
    </ApolloProvider>
  </ConfigProvider>,
)

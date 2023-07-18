import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { mainRouter } from './route/mainRoute'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from './store/rootStore'

//init dayjs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import theme from './view/theme'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
//TODO: init i18n

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <RouterProvider router={mainRouter} />
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
)

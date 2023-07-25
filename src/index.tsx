import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from './store/rootStore'
import theme from './styles/theme'
import { RouterProvider } from 'react-router-dom'
import { mainRouter } from './route/mainRoute'
//init dayjs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <RouterProvider router={mainRouter} />
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
)

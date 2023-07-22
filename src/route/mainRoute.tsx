import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/view/App'
import { lazyLoader } from '@/utils/lazyLoader'
import { boardDataLoader } from '@/loader/boardLoader'

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Navigate to="clock" />,
      },
      {
        path: 'clock',
        lazy: lazyLoader(() => import('@/view/Clock')),
      },
      {
        path: 'board/*',
        loader: boardDataLoader,
        lazy: lazyLoader(() => import('@/view/board/Board')),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/clock" />,
  },
])

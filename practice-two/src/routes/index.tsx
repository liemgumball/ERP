import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { PATH_NAME } from '@constants/services';

const router = createBrowserRouter([
  {
    Component: lazy(() => import('@utils/PrivateRoutes')),
    children: [
      {
        Component: lazy(() => import('@layouts/MainLayout')),
        children: [
          {
            path: PATH_NAME.HOME,
            Component: lazy(() => import('@pages/DashBoardPage')),
          },
          {
            path: PATH_NAME.STUDENTS,
            Component: lazy(() => import('@pages/StudentPage')),
          },
          {
            path: PATH_NAME.PAYMENTS,
            Component: lazy(() => import('@pages/PaymentPage')),
          },
          {
            path: '/*',
            Component: lazy(() => import('@pages/EmptyPage')),
          },
        ],
      },
    ],
  },
  {
    path: PATH_NAME.LOGIN,
    Component: lazy(() => import('@pages/LoginPage')),
  },
  {
    path: '/register',
    Component: lazy(() => import('@pages/RegisterPage')),
  },
]);

export default router;

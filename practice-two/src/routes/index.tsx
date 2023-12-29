import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { PATH_NAME } from '@constants/services';

const router = createBrowserRouter([
  {
    Component: lazy(() => import('@components/PrivateRoutes')),
    children: [
      {
        Component: lazy(() => import('@components/MainLayout')),
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
            path: PATH_NAME.REPORTS,
            Component: lazy(() => import('@pages/ReportPage')),
          },
          {
            path: '/*',
            Component: lazy(() => import('@pages/EmptyPage')),
          },
          {
            path: PATH_NAME.SETTINGS,
            Component: lazy(() => import('@pages/SettingPage')),
          },
          {
            path: PATH_NAME.COURSES,
            Component: lazy(() => import('@pages/CoursesPage')),
          },
          {
            path: `${PATH_NAME.COURSES}/add`,
            Component: lazy(() => import('@pages/AddCoursesPage')),
          },
          {
            path: `${PATH_NAME.COURSES}/:subject`,
            Component: lazy(
              () => import('@pages/CoursesPage/components/CoursesList')
            ),
            loader: async ({ request, params }) => {
              return fetch(
                `${import.meta.env.VITE_API_URL}/api/subject/${
                  params.subject
                }/`,
                {
                  signal: request.signal,
                }
              );
            },
          },
          {
            path: `${PATH_NAME.COURSES}/:subject/:course_id`,
            Component: lazy(
              () => import('@pages/CoursesPage/components/CourseDetail')
            ),
            loader: async ({ request, params }) => {
              return fetch(
                `${import.meta.env.VITE_API_URL}/api/course/${
                  params.course_id
                }`,
                {
                  signal: request.signal,
                }
              );
            },
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

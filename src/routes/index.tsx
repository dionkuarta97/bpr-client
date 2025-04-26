import Home from '@/pages/home';
import AuthGuardWrapper from '@/components/wrapper/auth-guard-wrapper';
import Login from '@/pages/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginGuardWrapper from '@/components/wrapper/login-guard-wrapper';
import AdminWrapper from '@/components/wrapper/admin-wrapper';
import ProfileWrapper from '@/components/wrapper/profile-wrapper';
import GeneralInformation from '@/pages/profile/general-information';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuardWrapper />,
    children: [
      {
        path: '/',
        element: <AdminWrapper />,
        children: [
          {
            path: '/',
            element: <ProfileWrapper />,
            children: [
              {
                path: '/',
                element: <GeneralInformation />,
              },
            ],
          },
          {
            path: 'profile',
            element: <ProfileWrapper />,
            children: [
              {
                path: 'profile',
                element: <GeneralInformation />,
              },
              {
                path: 'visi-misi',
                element: <Home />,
              },
              {
                path: 'struktur-organisasi',
                element: <Home />,
              },
              {
                path: 'banner',
                element: <Home />,
              },
            ],
          },
          {
            path: 'produk-layanan',
            element: <Home />,
          },
          {
            path: 'publikasi',
            element: <Home />,
          },
          {
            path: 'gallery',
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginGuardWrapper />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;

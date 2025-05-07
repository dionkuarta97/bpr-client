import Home from '@/pages/home';
import AuthGuardWrapper from '@/components/wrapper/auth-guard-wrapper';
import Login from '@/pages/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginGuardWrapper from '@/components/wrapper/login-guard-wrapper';
import AdminWrapper from '@/components/wrapper/admin-wrapper';
import ProfileWrapper from '@/components/wrapper/profile-wrapper';
import GeneralInformation from '@/pages/profile/general-information';
import VisiMisi from '@/pages/profile/visi-misi';
import StrukturPerusahaan from '@/pages/profile/struktur-perusahaan';
import Banner from '@/pages/profile/banner';
import Product from '@/pages/product';
import AddProduct from '@/pages/add-product';
import ProductWrapper from '@/components/wrapper/product-wrapper';
import DetailProduct from '@/pages/detail-product';
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
                element: <VisiMisi />,
              },
              {
                path: 'struktur-organisasi',
                element: <StrukturPerusahaan />,
              },
              {
                path: 'banner',
                element: <Banner />,
              },
            ],
          },
          {
            path: 'produk-layanan',
            element: <ProductWrapper />,
            children: [
              {
                path: '',
                index: true,
                element: <Product />,
              },
              {
                path: 'tambah',
                element: <AddProduct />,
              },
              {
                path: ':id',
                element: <DetailProduct />,
              },
            ],
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

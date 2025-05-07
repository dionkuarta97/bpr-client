import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaBook, FaNewspaper } from 'react-icons/fa';

const useController = () => {
  const pathname = useLocation();
  const navigate = useNavigate();

  const menu = useMemo(() => {
    return [
      {
        label: 'Profile',
        path: '/',
        icon: (
          <FaUser
            className={`${
              pathname.pathname === '/' || pathname.pathname.startsWith('/profile')
                ? 'text-text-on-primary'
                : 'text-text-secondary'
            }`}
          />
        ),
        isActive: pathname.pathname === '/' || pathname.pathname.startsWith('/profile'),
      },
      {
        label: 'Produk & Layanan',
        path: '/produk-layanan',
        icon: (
          <FaBook
            className={`${
              pathname.pathname.startsWith('/produk-layanan')
                ? 'text-text-on-primary'
                : 'text-text-secondary'
            }`}
          />
        ),
        isActive: pathname.pathname.startsWith('/produk-layanan'),
      },
      {
        label: 'Publikasi',
        path: '/publikasi',
        icon: (
          <FaNewspaper
            className={`${
              pathname.pathname.startsWith('/publikasi')
                ? 'text-text-on-primary'
                : 'text-text-secondary'
            }`}
          />
        ),
        isActive: pathname.pathname.startsWith('/publikasi'),
      },
    ];
  }, [pathname.pathname]);

  const activeMenu = useMemo(() => {
    return menu.find(item => item.isActive)?.label;
  }, [menu]);
  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return { menu, handleMenuClick, activeMenu };
};

export default useController;

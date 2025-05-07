import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export type ProfileMenu = {
  label: string;
  path: string;
  active: boolean;
};

const useController = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const profileMenu: ProfileMenu[] = useMemo(() => {
    return [
      {
        label: 'General Information',
        path: '/',
        active: pathname.pathname === '/' || pathname.pathname === '/profile',
      },
      {
        label: 'Visi & Misi',
        path: '/profile/visi-misi',
        active: pathname.pathname.startsWith('/profile/visi-misi'),
      },
      {
        label: 'Struktur Perusahaan',
        path: '/profile/struktur-organisasi',
        active: pathname.pathname.startsWith('/profile/struktur-organisasi'),
      },
      {
        label: 'Banner',
        path: '/profile/banner',
        active: pathname.pathname.startsWith('/profile/banner'),
      },
    ];
  }, [pathname.pathname]);

  const profileActive = useMemo(() => {
    return profileMenu.find(menu => menu.active)?.label;
  }, [profileMenu]);
  const handleProfileActive = useCallback(
    (label: (typeof profileMenu)[number]['label']) => {
      navigate(profileMenu.find(menu => menu.label === label)?.path || profileMenu[0].path);
    },
    [profileMenu, navigate]
  );

  return {
    profileMenu,
    profileActive,
    handleProfileActive,
  };
};

export default useController;

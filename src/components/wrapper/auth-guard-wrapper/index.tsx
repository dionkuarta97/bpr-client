import { Navigate, Outlet } from 'react-router-dom';
import useController from '@/components/wrapper/auth-guard-wrapper/libs/useContoller';

const AuthGuardWrapper = () => {
  const { isAuthenticated } = useController();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthGuardWrapper;

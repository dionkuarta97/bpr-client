import { Navigate, Outlet } from 'react-router-dom';
import useController from './libs/useController';

const LoginGuardWrapper = () => {
  const { isLoggedIn } = useController();

  return <>{!isLoggedIn ? <Outlet /> : <Navigate to="/" />}</>;
};

export default LoginGuardWrapper;

import { Navigate } from "react-router";
import { Outlet } from "react-router";
import useController from "./libs/useContoller";

const AuthGuardWrapper = () => {
  const { isAuthenticated } = useController();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthGuardWrapper;

import Home from "../pages/home";
import AuthGuardWrapper from "../components/wrapper/auth-guard-wrapper";
import Login from "../pages/login";
import { createBrowserRouter, RouterProvider } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuardWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;

import HeaderMenu from '@/components/headers/HeaderMenu';
import Text from '@/components/text';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import useController from './libs/useController';
const AdminWrapper = () => {
  const { handleLogout } = useController();
  return (
    <div className="flex min-h-screen flex-col w-full">
      <div
        className={`w-full px-20 py-8 flex flex-row justify-between items-center bg-white shadow-lg`}
      >
        <Text label="Admin BPR" className="text-text-secondary" variant="h1" />
        <Button variant="contained" color="primary" onClick={handleLogout}>
          <Text label="Logout" className="text-text-on-primary" variant="body1" />
        </Button>
      </div>
      <HeaderMenu />
      <div className="flex min-h-screen px-20 py-8 bg-background-default">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminWrapper;

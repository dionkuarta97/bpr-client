import useAuthStore from '@/store';
import { useNavigate } from 'react-router-dom';

const useController = () => {
  const { handleSetToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSetToken('');
    navigate('/login');
  };

  return { handleLogout };
};

export default useController;

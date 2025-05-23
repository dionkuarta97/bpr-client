import { useAuthStore } from '@/store';

const useController = () => {
  const { token } = useAuthStore();

  const isAuthenticated = !!token;

  return {
    isAuthenticated,
  };
};

export default useController;

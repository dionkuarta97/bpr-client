import { useAuthStore } from '@/store';

const useController = () => {
  const { token } = useAuthStore();
  const isLoggedIn = !!token;

  return { isLoggedIn };
};

export default useController;

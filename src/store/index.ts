import { useAtom } from 'jotai';
import authStore from './auth';
import { useCallback } from 'react';
import { LoginResponse } from '@/interface';

export const useAuthStore = () => {
  const [token, setToken] = useAtom(authStore.token);
  const [user, setUser] = useAtom(authStore.user);
  const handleSetToken = useCallback(
    (token: LoginResponse['token']) => {
      setToken(token);
    },
    [setToken]
  );
  const handleSetUser = useCallback(
    (user: LoginResponse['user']) => {
      setUser(user);
    },
    [setUser]
  );
  return { token, user, handleSetToken, handleSetUser };
};

export default useAuthStore;

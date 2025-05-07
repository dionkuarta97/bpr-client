import { useAtom } from 'jotai';
import authStore from './auth';
import { useCallback } from 'react';
import { LoginResponse } from '@/interface';
import profileStore from './profile';
export const useAuthStore = () => {
  const [token, setToken] = useAtom(authStore.token);
  const [user, setUser] = useAtom(authStore.user);
  const [editStruktur, setEditStruktur] = useAtom(profileStore.editStruktur);
  const [editStrukturId, setEditStrukturId] = useAtom(profileStore.editStrukturId);
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
  return {
    token,
    user,
    handleSetToken,
    handleSetUser,
    editStruktur,
    setEditStruktur,
    editStrukturId,
    setEditStrukturId,
  };
};

export default useAuthStore;

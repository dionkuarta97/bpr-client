import { atomWithStorage } from 'jotai/utils';
import { LoginResponse } from '@/interface';

const tokenState = atomWithStorage<LoginResponse['token'] | null>(
  'token',
  localStorage.getItem('token') || null
);
const userState = atomWithStorage<LoginResponse['user'] | null>(
  'user',
  JSON.parse(localStorage.getItem('user') || 'null')
);

const authStore = {
  token: tokenState,
  user: userState,
};

export default authStore;

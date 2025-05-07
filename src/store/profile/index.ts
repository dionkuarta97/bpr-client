import { CreateStrukturPerusahaanRequest } from '@/interface/profile/request';
import { atom } from 'jotai';

const profileStore = {
  editStruktur: atom<CreateStrukturPerusahaanRequest | null>(null),
  editStrukturId: atom<string | null>(null),
};

export default profileStore;

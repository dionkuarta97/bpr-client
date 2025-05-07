import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { CreateStrukturPerusahaanRequest, ErrorResponse } from '@/interface';
import { useMutation } from '@tanstack/react-query';

const postStruktur = async (data: CreateStrukturPerusahaanRequest) => {
  const response = await admin.post('/profile/create-struktur', data, {
    'Content-Type': 'multipart/form-data',
  });
  return response.data;
};

const useMutationCreateStruktur = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postStruktur,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['struktur-perusahaan'] });
      toast.success('Struktur berhasil ditambahkan', 'Struktur berhasil ditambahkan');
    },
    onError: (error: ErrorResponse) => {
      toast.error('Struktur gagal ditambahkan', error.message || 'Terjadi kesalahan');
    },
  });
  return { mutateAsync };
};

export default useMutationCreateStruktur;

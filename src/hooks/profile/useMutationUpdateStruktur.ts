import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { CreateStrukturPerusahaanRequest, ErrorResponse } from '@/interface';
import { useMutation } from '@tanstack/react-query';

const updateStruktur = async (data: CreateStrukturPerusahaanRequest & { id: string }) => {
  const response = await admin.post(`/profile/update-struktur/${data.id}`, data, {
    'Content-Type': 'multipart/form-data',
  });
  return response.data;
};

const useMutationUpdateStruktur = () => {
  const { mutateAsync } = useMutation({
    mutationFn: updateStruktur,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['struktur-perusahaan'] });
      toast.success('Struktur berhasil diubah', 'Struktur berhasil diubah');
    },
    onError: (error: ErrorResponse) => {
      toast.error('Struktur gagal diubah', error.message || 'Terjadi kesalahan');
    },
  });
  return { mutateAsync };
};

export default useMutationUpdateStruktur;

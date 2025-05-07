import { useMutation } from '@tanstack/react-query';
import { admin } from '@/axios';
import { queryClient } from '@/app';
import { toast } from '@/components/toast';
import { ErrorResponse } from '@/interface';

const deleteStruktur = async (id: string) => {
  const response = await admin.delete(`/profile/delete-struktur/${id}`);
  return response.data;
};

const useMutationDeleteStruktur = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteStruktur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['struktur-perusahaan'] });
      toast.success('Struktur berhasil dihapus', 'Struktur berhasil dihapus');
    },
    onError: (error: ErrorResponse) => {
      toast.error('Struktur gagal dihapus', error.message || 'Terjadi kesalahan');
    },
  });
  return { mutateAsync };
};

export default useMutationDeleteStruktur;

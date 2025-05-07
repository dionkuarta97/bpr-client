import { admin } from '@/axios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app';
import { toast } from '@/components/toast';

const deleteMisi = async (id: string) => {
  const response = await admin.delete(`/profile/delete-misi/${id}`);
  return response.data;
};

const useMutationDeleteMisi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteMisi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visi-misi'] });
      toast.success('Berhasil', 'Berhasil menghapus misi');
    },
    onError: error => {
      toast.error('Gagal', error.message || 'Gagal menghapus misi');
    },
  });
  return { deleteMisi: mutateAsync };
};

export default useMutationDeleteMisi;

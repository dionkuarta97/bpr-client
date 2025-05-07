import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { useMutation } from '@tanstack/react-query';

const deleteBanner = async (id: number) => {
  const response = await admin.delete(`/profile/delete-banner/${id}`);
  return response.data;
};

const useMutationDeleteBanner = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-banner'] });
      toast.success('Berhasil', 'Berhasil menghapus banner');
    },
    onError: error => {
      toast.error('Gagal', error.message || 'Gagal menghapus banner');
    },
  });
  return { deleteBanner: mutateAsync };
};

export default useMutationDeleteBanner;

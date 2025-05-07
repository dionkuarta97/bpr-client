import { VisiMisiResponse } from '@/interface';
import { admin } from '@/axios';
import { SuccessResponse } from '@/interface';
import { UpdateVisiRequest } from '@/interface/profile/request';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app';
import { toast } from '@/components/toast';

const updateVisi = async (data: UpdateVisiRequest) => {
  const response = await admin.post<SuccessResponse<VisiMisiResponse>>(
    '/profile/update-visi',
    data
  );
  return response.data;
};

const useMutationUpdateVisi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: updateVisi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visi-misi'] });
      toast.success('Berhasil', 'Berhasil mengubah visi');
    },
    onError: (e: Error) => {
      toast.error('Gagal', e.message || 'Gagal mengubah visi');
    },
  });
  return {
    updateVisi: mutateAsync,
  };
};

export default useMutationUpdateVisi;

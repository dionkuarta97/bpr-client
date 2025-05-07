import { admin } from '@/axios';
import { SuccessResponse } from '@/interface';
import { VisiMisiResponse } from '@/interface';
import { CreateMisiRequest } from '@/interface/profile/request';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/app';
import { toast } from '@/components/toast';

const createMisi = async (data: CreateMisiRequest[]) => {
  const response = await admin.post<SuccessResponse<VisiMisiResponse>>('/profile/create-misi', {
    misi: data,
  });
  return response.data;
};

const useMutationCreateMisi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: createMisi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visi-misi'] });
      toast.success('Berhasil', 'Berhasil membuat misi');
    },
    onError: (e: Error) => {
      toast.error('Gagal', e.message || 'Gagal membuat misi');
    },
  });
  return { createMisi: mutateAsync };
};

export default useMutationCreateMisi;

import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { CreateBannerRequest } from '@/interface/profile/request';
import { useMutation } from '@tanstack/react-query';

const createBanner = async (data: CreateBannerRequest) => {
  const response = await admin.post('/profile/create-banner', data, {
    'Content-Type': 'multipart/form-data',
  });
  return response.data;
};

const useMutationCreateBanner = () => {
  const { mutateAsync } = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-banner'] });
      toast.success('Berhasil', 'Berhasil membuat banner');
    },
    onError: error => {
      toast.error('Gagal', error.message || 'Gagal membuat banner');
    },
  });
  return { createBanner: mutateAsync };
};

export default useMutationCreateBanner;

import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { PublikasiRequest } from '@/interface/publikasi/request';
import { PublikasiResponse } from '@/interface/publikasi/response';
import { useMutation } from '@tanstack/react-query';

const createPublikasi = async (data: PublikasiRequest) => {
  const response = await admin.post<SuccessResponse<PublikasiResponse>>(
    '/publikasi/create-publikasi',
    data,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
  return response.data;
};

const useMutationCreatePublikasi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: createPublikasi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publikasi'] });
      toast.success('Berhasil', 'Publikasi berhasil dibuat');
    },
    onError: (error: any) => {
      toast.error('Gagal', error.message || 'Publikasi gagal dibuat');
    },
  });

  return { createPublikasi: mutateAsync };
};

export default useMutationCreatePublikasi;

import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { PublikasiRequest } from '@/interface/publikasi/request';
import { PublikasiResponse } from '@/interface/publikasi/response';
import { useMutation } from '@tanstack/react-query';

interface UpdatePublikasiProps {
  data: PublikasiRequest;
  id: string;
}

const updatePublikasi = async ({ data, id }: UpdatePublikasiProps) => {
  const response = await admin.post<SuccessResponse<PublikasiResponse>>(
    '/publikasi/update-publikasi/' + id,
    data,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
  return response.data;
};

const useMutationUpdatePublikasi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdatePublikasiProps) => updatePublikasi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publikasi'] });
      toast.success('Berhasil', 'Publikasi berhasil diubah');
    },
    onError: (error: any) => {
      toast.error('Gagal', error.message || 'Publikasi gagal diubah');
    },
  });

  return { updatePublikasi: mutateAsync };
};

export default useMutationUpdatePublikasi;

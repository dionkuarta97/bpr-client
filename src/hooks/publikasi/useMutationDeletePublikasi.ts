import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { PublikasiResponse } from '@/interface/publikasi/response';
import { useMutation } from '@tanstack/react-query';

const deletePublikasi = async (id: string) => {
  const response = await admin.delete<SuccessResponse<PublikasiResponse>>(
    '/publikasi/delete-publikasi/' + id
  );
  return response.data;
};

const useMutationDeletePublikasi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deletePublikasi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publikasi'] });
      queryClient.invalidateQueries({ queryKey: ['publikasi/tahun'] });
      toast.success('Berhasil', 'Publikasi berhasil dihapus');
    },
    onError: error => {
      toast.error('Gagal', error.message || 'Gagal menghapus publikasi');
    },
  });

  return { deletePublikasi: mutateAsync };
};

export default useMutationDeletePublikasi;

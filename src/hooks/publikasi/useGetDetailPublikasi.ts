import { publicApi } from '@/axios';
import { SuccessResponse, PublikasiResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getDetailPublikasi = async (id: string): Promise<SuccessResponse<PublikasiResponse>> => {
  const response = await publicApi.get(`/publikasi/${id}`);
  return response.data;
};

const useGetDetailPublikasi = (id: string) => {
  return useQuery({
    queryKey: ['publikasi', id],
    queryFn: () => getDetailPublikasi(id),
    enabled: !!id,
  });
};

export default useGetDetailPublikasi;

import { publicApi } from '@/axios';
import { PublikasiRequestParams, PublikasiResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getPublikasi = async (params: PublikasiRequestParams) => {
  const response = await publicApi.getPagination<PublikasiRequestParams, PublikasiResponse[]>(
    '/publikasi',
    params
  );
  return response.data;
};

const useGetPublikasi = (params: PublikasiRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['publikasi', params],
    queryFn: () => getPublikasi(params),
  });

  return { data, isLoading, error };
};

export default useGetPublikasi;

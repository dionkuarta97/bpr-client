import { StrukturPerusahaanResponse } from '@/interface/profile/response';
import { publicApi } from '@/axios';
import { SuccessResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getStrukturPerusahaan = async (): Promise<SuccessResponse<StrukturPerusahaanResponse[]>> => {
  const response = await publicApi.get('/profile/struktur-perusahaan');
  return response.data;
};

const useGetStrukturPerusahaan = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['struktur-perusahaan'],
    queryFn: getStrukturPerusahaan,
  });

  return { data, isLoading, error };
};

export default useGetStrukturPerusahaan;

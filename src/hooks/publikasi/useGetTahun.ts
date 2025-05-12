import { publicApi } from '@/axios';
import { SuccessResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getTahun = async (): Promise<SuccessResponse<string[]>> => {
  const response = await publicApi.get(`/publikasi/tahun`);
  return response.data;
};

const useGetTahun = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['publikasi/tahun'],
    queryFn: getTahun,
  });

  return { data, isLoading, error };
};

export default useGetTahun;

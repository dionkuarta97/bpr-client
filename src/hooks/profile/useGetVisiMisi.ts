import { VisiMisiResponse } from '@/interface/profile/response';
import { SuccessResponse } from '@/interface';
import { publicApi } from '@/axios';
import { useQuery } from '@tanstack/react-query';
const getVisiMisi = async (): Promise<SuccessResponse<VisiMisiResponse>> => {
  const response = await publicApi.get(`/profile/visi-misi`);
  return response.data;
};

const useGetVisiMisi = () => {
  const { data, refetch } = useQuery({
    queryKey: ['visi-misi'],
    queryFn: getVisiMisi,
  });

  return { data, refetch };
};

export default useGetVisiMisi;

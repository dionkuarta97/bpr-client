import { publicApi } from '@/axios';
import { SuccessResponse, BannerResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getBanner = async (): Promise<SuccessResponse<BannerResponse[]>> => {
  const response = await publicApi.get('/profile/banner');
  return response.data;
};

const useGetBanner = () => {
  const { data } = useQuery({
    queryKey: ['get-banner'],
    queryFn: getBanner,
  });

  return {
    banner: data,
  };
};

export default useGetBanner;

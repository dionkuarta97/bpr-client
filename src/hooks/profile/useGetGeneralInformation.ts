import axiosInstance from '@/axios';
import { SuccessResponse, GeneralInformationResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getGeneralInformation = async (): Promise<SuccessResponse<GeneralInformationResponse>> => {
  const response = await axiosInstance.get('/public/profile/general-information');
  return response.data;
};

const useGetGeneralInformation = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['general-information'],
    queryFn: getGeneralInformation,
  });

  return { data, isLoading, error };
};

export default useGetGeneralInformation;

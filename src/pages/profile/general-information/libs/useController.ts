import useGetGeneralInformation from '@/hooks/profile/useGetGeneralInformation';

const useController = () => {
  const { data, isLoading, error } = useGetGeneralInformation();

  return { data: data?.data, isLoading, error };
};

export default useController;

import useGetDetailPublikasi from '@/hooks/publikasi/useGetDetailPublikasi';
import { useParams } from 'react-router-dom';

const useController = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetDetailPublikasi(id as string);
  return { data, isLoading, error };
};

export default useController;

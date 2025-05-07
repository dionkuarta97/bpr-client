import useGetDetailProduct from '@/hooks/product/useGetDetailProduct';
import { useParams } from 'react-router-dom';

const useController = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetDetailProduct(id as string);
  return { data, isLoading, error };
};

export default useController;

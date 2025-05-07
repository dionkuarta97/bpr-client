import { publicApi } from '@/axios';
import { ProductRequestParams, ProductResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getProducts = async (params: ProductRequestParams) => {
  const response = await publicApi.getPagination<ProductRequestParams, ProductResponse[]>(
    '/product',
    params
  );
  return response.data;
};

const useGetProducts = (params: ProductRequestParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });

  return { data, isLoading, error };
};

export default useGetProducts;

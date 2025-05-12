import { publicApi } from '@/axios';
import { ProductResponse, SuccessResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const getDetailProduct = async (id: string): Promise<SuccessResponse<ProductResponse>> => {
  const response = await publicApi.get(`/product/${id}`);
  return response.data;
};

const useGetDetailProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getDetailProduct(id),
    enabled: !!id,
  });
};

export default useGetDetailProduct;

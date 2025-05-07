import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { ProductRequest } from '@/interface/product/request';
import { ProductResponse } from '@/interface/product/response';
import { useMutation } from '@tanstack/react-query';

const createProduct = async (data: ProductRequest) => {
  const response = await admin.post<SuccessResponse<ProductResponse>>(
    '/product/create-product',
    data,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
  return response.data;
};

const useMutationCreateProduct = () => {
  const { mutateAsync } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Berhasil', 'Produk berhasil dibuat');
    },
    onError: () => {
      toast.error('Gagal', 'Produk gagal dibuat');
    },
  });

  return { createProduct: mutateAsync };
};

export default useMutationCreateProduct;

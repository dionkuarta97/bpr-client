import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { ProductRequest } from '@/interface/product/request';
import { ProductResponse } from '@/interface/product/response';
import { useMutation } from '@tanstack/react-query';

interface UpdateProductProps {
  data: ProductRequest;
  id: string;
}

const updateProduct = async ({ data, id }: UpdateProductProps) => {
  const response = await admin.post<SuccessResponse<ProductResponse>>(
    '/product/update-product/' + id,
    data,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
  return response.data;
};

const useMutationUpdateProduct = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateProductProps) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Berhasil', 'Produk berhasil diubah');
    },
    onError: (error: any) => {
      toast.error('Gagal', error.message || 'Produk gagal diubah');
    },
  });

  return { updateProduct: mutateAsync };
};

export default useMutationUpdateProduct;

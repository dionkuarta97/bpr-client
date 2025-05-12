import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import { SuccessResponse } from '@/interface/api/successReponse';
import { ProductResponse } from '@/interface/product/response';
import { useMutation } from '@tanstack/react-query';

const deleteProduct = async (id: string) => {
  const response = await admin.delete<SuccessResponse<ProductResponse>>(
    '/product/delete-product/' + id
  );
  return response.data;
};

const useMutationDeleteProduct = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Berhasil', 'Produk berhasil dihapus');
    },
    onError: error => {
      toast.error('Gagal', error.message || 'Gagal menghapus produk');
    },
  });

  return { deleteProduct: mutateAsync };
};

export default useMutationDeleteProduct;

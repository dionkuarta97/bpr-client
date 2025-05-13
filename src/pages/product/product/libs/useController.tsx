import useGetProducts from '@/hooks/product/useGetProducts';
import { Column, Row } from '@/interface/global';
import { ProductResponse } from '@/interface/product/response';
import { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import useMutationDeleteProduct from '@/hooks/product/useMutationDeleteProduct';
import useOpenClose from '@/hooks/useOpenClose';
const useController = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = params.get('page') || 1;
  const limit = params.get('limit') || 10;
  const tipe = params.get('tipe') || '';
  const { open, handleOpen, handleClose } = useOpenClose();
  const [id, setId] = useState<string>('');
  const { deleteProduct } = useMutationDeleteProduct();
  const { data } = useGetProducts({
    page: Number(page),
    limit: Number(limit),
    tipe,
  });

  const columns: Column<ProductResponse>[] = useMemo(
    () => [
      {
        field: 'no',
        headerName: 'No',
        width: 20,
      },
      {
        field: 'judul',
        headerName: 'Judul',
        width: 100,
      },
      {
        field: 'deskripsi',
        headerName: 'Deskripsi',
        width: 200,
      },
      {
        field: 'tipe',
        headerName: 'Tipe',
        width: 50,
      },
      {
        field: 'foto',
        headerName: 'Foto',
        width: 150,
        render: (row: ProductResponse) => {
          return (
            <img src={row.foto} alt="Foto" className="h-50 w-auto rounded-md object-contain" />
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 50,
      },
    ],
    [data]
  );

  const rows: Row<ProductResponse>[] = useMemo(() => {
    return (
      data?.metadata.data.map((product: ProductResponse, index: number) => ({
        ...product,
        no: index + 1 + (data?.metadata.current_page - 1) * data?.metadata.per_page,
        actions: [
          {
            actionName: 'View',
            action: () => {
              navigate(`/produk-layanan/${product.id}`);
            },
            icon: () => <FaEye className="text-blue-500" />,
          },
          {
            actionName: 'Delete',
            action: () => {
              setId(product.id.toString());
              handleOpen();
            },
            icon: () => <FaTrash className="text-red-500" />,
          },
          {
            actionName: 'Edit',
            action: () => {
              navigate(`/produk-layanan/edit/${product.id}`);
            },
            icon: () => <FaEdit className="text-green-500" />,
          },
        ],
      })) || []
    );
  }, [data]);

  const handleDelete = () => {
    deleteProduct(id);
    setId('');
    handleClose();
  };

  const handleParamsChange = (paramName: string, paramValue: string) => {
    const newParams: Record<string, string> = {};

    if (tipe && paramName !== 'tipe') newParams.tipe = tipe;

    if (paramValue !== 'semua') {
      newParams[paramName] = paramValue;
    }

    const queryString = new URLSearchParams(newParams).toString();
    navigate(queryString ? `?${queryString}` : '');
  };

  return {
    pagination: {
      page: data?.metadata.current_page,
      total: data?.metadata.total,
      perPage: data?.metadata.per_page,
      total_page: data?.metadata.total_page,
    },
    columns,
    rows,
    tipe,
    navigate,
    params,
    open,
    handleOpen,
    handleClose,
    handleDelete,
    handleParamsChange,
  };
};

export default useController;

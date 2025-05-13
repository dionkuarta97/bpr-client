import useGetPublikasi from '@/hooks/publikasi/useGetPublikasi';
import { Column, Row } from '@/interface/global';
import { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import useOpenClose from '@/hooks/useOpenClose';
import { PublikasiResponse } from '@/interface/publikasi/response';
import useMutationDeletePublikasi from '@/hooks/publikasi/useMutationDeletePublikasi';
import useGetTahun from '@/hooks/publikasi/useGetTahun';
const useController = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { data: tahunData } = useGetTahun();
  const page = params.get('page') || 1;
  const limit = params.get('limit') || 10;
  const tipe = params.get('tipe') || '';
  const tahun = params.get('tahun') || '';
  const { open, handleOpen, handleClose } = useOpenClose();
  const [id, setId] = useState<string>('');
  const { deletePublikasi } = useMutationDeletePublikasi();
  const { data } = useGetPublikasi({
    page: Number(page),
    limit: Number(limit),
    tipe,
    tahun,
  });

  const columns: Column<PublikasiResponse>[] = useMemo(
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
        field: 'tahun',
        headerName: 'Tahun',
        width: 50,
      },
      {
        field: 'foto',
        headerName: 'Foto',
        width: 150,
        render: (row: PublikasiResponse) => {
          return (
            <img
              src={row.foto || ''}
              alt="Foto"
              className="h-50 w-auto rounded-md object-contain"
            />
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

  const rows: Row<PublikasiResponse>[] = useMemo(() => {
    return (
      data?.metadata.data.map((publikasi: PublikasiResponse, index: number) => ({
        ...publikasi,
        no: index + 1 + (data?.metadata.current_page - 1) * data?.metadata.per_page,
        actions: [
          {
            actionName: 'View',
            action: () => {
              navigate(`/publikasi/${publikasi.id}`);
            },
            icon: () => <FaEye className="text-blue-500" />,
          },
          {
            actionName: 'Delete',
            action: () => {
              setId(publikasi.id.toString());
              handleOpen();
            },
            icon: () => <FaTrash className="text-red-500" />,
          },
          {
            actionName: 'Edit',
            action: () => {
              navigate(`/publikasi/edit/${publikasi.id}`);
            },
            icon: () => <FaEdit className="text-green-500" />,
          },
        ],
      })) || []
    );
  }, [data]);

  const handleDelete = () => {
    deletePublikasi(id);
    setId('');
    handleClose();
  };

  const handleParamsChange = (paramName: string, paramValue: string) => {
    const newParams: Record<string, string> = {};

    if (tipe && paramName !== 'tipe') newParams.tipe = tipe;
    if (tahun && paramName !== 'tahun') newParams.tahun = tahun;

    if (paramValue !== 'semua') {
      newParams[paramName] = paramValue;
    }

    const queryString = new URLSearchParams(newParams).toString();
    navigate(queryString ? `?${queryString}` : '');
  };

  const handleResetFilter = () => {
    navigate('/publikasi');
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
    tahunData: tahunData?.data,
    tahun,
    handleParamsChange,
    handleResetFilter,
  };
};

export default useController;

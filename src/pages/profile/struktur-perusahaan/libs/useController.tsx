import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { Row } from '@/interface/global';
import { StrukturPerusahaanResponse } from '@/interface/profile/response';
import useOpenClose from '@/hooks/useOpenClose';
import useGetStrukturPerusahaan from '@/hooks/profile/useGetStrukturPerusahaan';
import useMutationCreateStruktur from '@/hooks/profile/useMutationCreateStruktur';
import { CreateStrukturPerusahaanRequest } from '@/interface';
import useMutationDeleteStruktur from '@/hooks/profile/useMutationDeleteStruktur';
import { useAuthStore } from '@/store';
import useMutationUpdateStruktur from '@/hooks/profile/useMutationUpdateStruktur';
const useController = () => {
  const { open, handleOpen, handleClose } = useOpenClose();
  const {
    open: openModalTambahStruktur,
    handleOpen: handleOpenModalTambahStruktur,
    handleClose: handleCloseModalTambahStruktur,
  } = useOpenClose();
  const {
    open: openModalDeleteStruktur,
    handleOpen: handleOpenModalDeleteStruktur,
    handleClose: handleCloseModalDeleteStruktur,
  } = useOpenClose();
  const {
    open: openModalEditStruktur,
    handleOpen: handleOpenModalEditStruktur,
    handleClose: handleCloseModalEditStruktur,
  } = useOpenClose();
  const { mutateAsync: createStruktur } = useMutationCreateStruktur();
  const { mutateAsync: deleteStruktur } = useMutationDeleteStruktur();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<StrukturPerusahaanResponse | null>(null);
  const { data } = useGetStrukturPerusahaan();
  const { mutateAsync: updateStruktur } = useMutationUpdateStruktur();
  const { setEditStruktur, setEditStrukturId, editStrukturId, editStruktur } = useAuthStore();
  const columns = useMemo(
    () => [
      {
        field: 'no',
        headerName: 'No',
        width: 50,
      },
      {
        field: 'nama',
        headerName: 'Nama',
        width: 150,
      },
      {
        field: 'jabatan',
        headerName: 'Jabatan',
        width: 150,
      },
      {
        field: 'foto',
        headerName: 'Foto',
        width: 150,
        render: (row: StrukturPerusahaanResponse) => {
          return (
            <img
              onClick={() => {
                setSelectedImage(row.foto);
                handleOpen();
              }}
              src={row.foto}
              alt="Foto"
              className="w-auto h-40  rounded-md object-contain cursor-pointer"
            />
          );
        },
      },
      {
        field: 'quote',
        headerName: 'Quote',
        width: 150,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
      },
    ],
    [data]
  );
  const rows: Row<StrukturPerusahaanResponse>[] = useMemo(() => {
    return (
      data?.data.map((item: StrukturPerusahaanResponse, index: number) => ({
        ...item,
        no: index + 1,
        actions: [
          {
            actionName: 'Edit',
            action: () => {
              setEditStruktur({
                nama: item.nama,
                jabatan: item.jabatan,
                quote: item.quote,
                foto: item.foto,
              });
              setEditStrukturId(item.id.toString());
              handleOpenModalEditStruktur();
            },
            icon: () => <FaEdit className="text-blue-500" />,
          },
          {
            actionName: 'Delete',
            action: () => {
              setSelectedData(item);
              handleOpenModalDeleteStruktur();
            },
            icon: () => <FaTrash className="text-red-500" />,
          },
        ],
      })) ?? []
    );
  }, [data]);
  const handleCreateStruktur = async (data: CreateStrukturPerusahaanRequest) => {
    await createStruktur(data);
  };

  const handleUpdateStruktur = async (data: CreateStrukturPerusahaanRequest) => {
    if (editStrukturId) {
      if (data.foto === editStruktur?.foto) {
        await updateStruktur({
          nama: data.nama,
          jabatan: data.jabatan,
          quote: data.quote,
          id: editStrukturId,
        });
      } else {
        await updateStruktur({
          nama: data.nama,
          jabatan: data.jabatan,
          quote: data.quote,
          id: editStrukturId,
          image: data.image,
        });
      }
    }
  };

  useEffect(() => {
    if (!openModalDeleteStruktur) {
      setSelectedData(null);
    }
  }, [openModalDeleteStruktur]);
  useEffect(() => {
    if (!openModalEditStruktur) {
      setEditStruktur(null);
      setEditStrukturId(null);
    }
  }, [openModalEditStruktur]);
  const handleDeleteStruktur = async () => {
    await deleteStruktur(selectedData?.id.toString() ?? '');
    handleCloseModalDeleteStruktur();
  };

  return {
    columns,
    rows,
    open,
    handleOpen,
    handleClose,
    selectedImage,
    setSelectedImage,
    openModalTambahStruktur,
    handleOpenModalTambahStruktur,
    handleCloseModalTambahStruktur,
    handleCreateStruktur,
    openModalDeleteStruktur,
    handleOpenModalDeleteStruktur,
    handleCloseModalDeleteStruktur,
    selectedData,
    handleDeleteStruktur,
    openModalEditStruktur,
    handleOpenModalEditStruktur,
    handleCloseModalEditStruktur,
    handleUpdateStruktur,
  };
};

export default useController;

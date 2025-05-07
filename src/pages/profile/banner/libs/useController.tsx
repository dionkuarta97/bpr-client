import useGetBanner from '@/hooks/profile/useGetBanner';
import { Row } from '@/interface/global';
import useMutationCreateBanner from '@/hooks/profile/useMutationCreateBanner';
import useMutationDeleteBanner from '@/hooks/profile/useMutationDeleteBanner';
import useOpenClose from '@/hooks/useOpenClose';
import { BannerResponse } from '@/interface/profile/response';
import { useEffect, useMemo, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const useController = () => {
  const { banner } = useGetBanner();
  const { createBanner } = useMutationCreateBanner();
  const { deleteBanner } = useMutationDeleteBanner();
  const {
    open: openModalTambahBanner,
    handleOpen: handleOpenModalTambahBanner,
    handleClose: handleCloseModalTambahBanner,
  } = useOpenClose();
  const {
    open: openModalDeleteBanner,
    handleOpen: handleOpenModalDeleteBanner,
    handleClose: handleCloseModalDeleteBanner,
  } = useOpenClose();

  const [image, setImage] = useState<File | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<BannerResponse | null>(null);
  const columns = useMemo(
    () => [
      {
        field: 'no',
        headerName: 'No',
        width: 100,
      },
      {
        field: 'path',
        headerName: 'Foto',
        width: 200,
        render: (row: BannerResponse) => {
          return (
            <img src={row.path} className="h-50 w-auto rounded-md object-contain" alt="banner" />
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
      },
    ],
    []
  );

  const rows: Row<BannerResponse>[] = useMemo(() => {
    return (
      banner?.data.map((item: BannerResponse, index: number) => ({
        ...item,
        no: index + 1,
        id: item.id,
        path: item.path,
        actions: [
          {
            actionName: 'Hapus',
            action: () => {
              setSelectedBanner(item);
              handleOpenModalDeleteBanner();
            },
            icon: () => <FaTrash className="text-red-500" />,
          },
        ],
      })) || []
    );
  }, [banner]);

  useEffect(() => {
    if (!openModalTambahBanner) {
      setSelectedBanner(null);
    }
  }, [openModalTambahBanner]);

  const handleDeleteBanner = async () => {
    await deleteBanner(selectedBanner?.id ?? 0);
    handleCloseModalDeleteBanner();
  };
  const handleCreateBanner = async () => {
    await createBanner({
      image: image ?? undefined,
    });
    handleCloseModalTambahBanner();
    setImage(null);
  };
  return {
    columns,
    rows,
    openModalTambahBanner,
    handleOpenModalTambahBanner,
    handleCloseModalTambahBanner,
    openModalDeleteBanner,
    handleOpenModalDeleteBanner,
    handleCloseModalDeleteBanner,
    handleDeleteBanner,
    handleCreateBanner,
    image,
    setImage,
  };
};

export default useController;

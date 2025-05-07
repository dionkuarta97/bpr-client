import DataTable from '@/components/table';
import useController from '../libs/useController';
import ModalDefault from '@/components/modal';
import Text from '@/components/text';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa';
import UploadImage from '@/components/input/upload-image';
const Content = () => {
  const {
    columns,
    rows,
    openModalDeleteBanner,
    handleCloseModalDeleteBanner,
    handleDeleteBanner,
    openModalTambahBanner,
    handleCloseModalTambahBanner,
    handleOpenModalTambahBanner,
    setImage,
    handleCreateBanner,
  } = useController();
  return (
    <div className="flex flex-col gap-4">
      <Button
        startIcon={<FaPlus />}
        className="w-fit"
        variant="contained"
        color="primary"
        onClick={handleOpenModalTambahBanner}
      >
        Tambah Banner
      </Button>
      <DataTable columns={columns} rows={rows} />
      <ModalDefault
        open={openModalDeleteBanner}
        onClose={handleCloseModalDeleteBanner}
        title="Hapus Banner"
        onConfirm={handleDeleteBanner}
        onCancel={handleCloseModalDeleteBanner}
        fotterCancel="Batal"
        fotterConfirm="Hapus"
      >
        <div className="flex items-center justify-center p-8">
          <Text
            label="Apakah anda yakin ingin menghapus banner ini?"
            className="text-center"
            variant="h2"
          />
        </div>
      </ModalDefault>
      <ModalDefault
        open={openModalTambahBanner}
        onClose={handleCloseModalTambahBanner}
        title="Tambah Banner"
        fotterCancel="Batal"
        fotterConfirm="Tambah"
        onConfirm={handleCreateBanner}
      >
        <div className="flex flex-col gap-4">
          <Text label="Foto" variant="h4" />
          <UploadImage
            onChange={file => {
              setImage(file);
            }}
          />
        </div>
      </ModalDefault>
    </div>
  );
};

export default Content;

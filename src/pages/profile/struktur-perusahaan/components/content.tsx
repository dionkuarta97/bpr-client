import DataTable from '@/components/table';
import useController from '../libs/useController';
import { StrukturPerusahaanResponse } from '@/interface/profile/response';
import Modal from '@/components/modal';
import ModalTambahStruktur from './modalTambahStruktur';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa';
import Text from '@/components/text';
import ModalEditStruktur from './modalEditStruktur';
const Content = () => {
  const {
    columns,
    rows,
    open,
    handleClose,
    selectedImage,
    setSelectedImage,
    openModalTambahStruktur,
    handleCloseModalTambahStruktur,
    handleOpenModalTambahStruktur,
    handleCreateStruktur,
    openModalDeleteStruktur,
    handleCloseModalDeleteStruktur,
    handleDeleteStruktur,
    openModalEditStruktur,
    handleCloseModalEditStruktur,
    handleUpdateStruktur,
  } = useController();

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-fit"
        variant="contained"
        startIcon={<FaPlus />}
        onClick={handleOpenModalTambahStruktur}
      >
        Tambah Struktur
      </Button>
      <DataTable<StrukturPerusahaanResponse> columns={columns} rows={rows} />
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setTimeout(() => {
            setSelectedImage(null);
          }, 100);
        }}
        title="Foto"
      >
        <img src={selectedImage ?? ''} alt="Foto" className="w-full h-150 object-contain" />
      </Modal>
      <ModalTambahStruktur
        open={openModalTambahStruktur}
        onClose={handleCloseModalTambahStruktur}
        onConfirm={handleCreateStruktur}
      />
      <Modal
        open={openModalDeleteStruktur}
        onClose={handleCloseModalDeleteStruktur}
        onConfirm={handleDeleteStruktur}
        onCancel={handleCloseModalDeleteStruktur}
        fotterCancel="Batal"
        fotterConfirm="Hapus"
        title="Hapus Struktur"
      >
        <div className="flex items-center justify-center p-8">
          <Text
            label="Apakah anda yakin ingin menghapus struktur ini?"
            className="text-center"
            variant="h2"
          />
        </div>
      </Modal>
      <ModalEditStruktur
        open={openModalEditStruktur}
        onClose={handleCloseModalEditStruktur}
        onConfirm={handleUpdateStruktur}
      />
    </div>
  );
};

export default Content;

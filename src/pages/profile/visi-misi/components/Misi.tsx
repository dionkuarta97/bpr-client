import ModalDefault from '@/components/modal';
import Text from '@/components/text';
import { CreateMisiRequest, VisiMisiResponse } from '@/interface';
import useMisiController from '../libs/useMisiController';
import { Button, IconButton, TextField } from '@mui/material';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import TextAreaDefault from '@/components/input/text-area-default/TextAreaDefault';
interface MisiProps {
  misi: VisiMisiResponse['misi'];
  handleChangeMisi: (value: string, target: string) => void;
  formMisi: CreateMisiRequest;
  handleSaveMisi: () => void;
  handleDeleteMisi: (id: string) => void;
}

const Misi = ({
  misi,
  handleChangeMisi,
  formMisi,
  handleSaveMisi,
  handleDeleteMisi,
}: MisiProps) => {
  const {
    open,
    handleOpen,
    handleClose,
    openDelete,
    handleOpenDelete,
    handleCloseDelete,
    id,
    handleSetId,
  } = useMisiController();

  return (
    <div className="flex flex-col w-full gap-4">
      {misi.map((misi, idx) => (
        <div className="flex flex-row items-start gap-2">
          <Text className="text-text-primary-default" label={`${idx + 1}.`} variant="h2" />
          <div className="flex flex-col items-start ">
            <Text className="text-text-primary-default" label={misi.judul} variant="h2" />
            <div className="flex flex-row items-center gap-2">
              <Text className="text-text-gray-light" label={misi.deskripsi} variant="h4" />
              <IconButton
                color="warning"
                size="small"
                onClick={() => {
                  handleSetId(misi.id.toString());
                  handleOpenDelete();
                }}
              >
                <FaRegTrashAlt size={16} />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
      <Button startIcon={<FaPlus />} className="w-fit" variant="outlined" onClick={handleOpen}>
        Tambah Misi
      </Button>
      <ModalDefault
        fotterCancel="Cancel"
        fotterConfirm="Tambah"
        onCancel={() => {
          handleClose();
          handleChangeMisi('', 'judul');
          handleChangeMisi('', 'deskripsi');
        }}
        onConfirm={() => {
          handleSaveMisi();
          handleClose();
          handleChangeMisi('', 'judul');
          handleChangeMisi('', 'deskripsi');
        }}
        title="Tambah Misi"
        open={open}
        onClose={() => {
          handleClose();
          handleChangeMisi('', 'judul');
          handleChangeMisi('', 'deskripsi');
        }}
        isDisableConfirm={formMisi.judul === '' || formMisi.deskripsi === ''}
      >
        <div className="flex flex-col w-full gap-4">
          <TextField
            label="Judul"
            value={formMisi.judul}
            onChange={e => handleChangeMisi(e.target.value, 'judul')}
          />
          <TextAreaDefault
            placeholder="Deskripsi"
            minRows={4}
            value={formMisi.deskripsi}
            onChange={e => handleChangeMisi(e.target.value, 'deskripsi')}
            name="deskripsi"
          />
        </div>
      </ModalDefault>
      <ModalDefault
        fotterCancel="Cancel"
        fotterConfirm="Hapus"
        onCancel={() => {
          handleCloseDelete();
          handleSetId('');
        }}
        onConfirm={() => {
          handleDeleteMisi(id);
          handleCloseDelete();
          handleSetId('');
        }}
        open={openDelete}
        onClose={() => {
          handleCloseDelete();
          handleSetId('');
        }}
        title="Hapus Misi"
      >
        <div className="flex items-center justify-center py-20 flex-col w-full gap-4">
          <Text
            className="text-center"
            label="Apakah anda yakin ingin menghapus misi ini?"
            variant="h2"
          />
        </div>
      </ModalDefault>
    </div>
  );
};

export default Misi;

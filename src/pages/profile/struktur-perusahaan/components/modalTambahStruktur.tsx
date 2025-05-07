import ModalDefault from '@/components/modal';
import Text from '@/components/text';
import useModalTambahStruktur from '../libs/useModalTambahStruktur';
import { TextField } from '@mui/material';
import UploadImage from '@/components/input/upload-image';
import TextAreaDefault from '@/components/input/text-area-default/TextAreaDefault';
import { CreateStrukturPerusahaanRequest } from '@/interface';
interface ModalTambahStrukturProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: CreateStrukturPerusahaanRequest) => void;
}

const ModalTambahStruktur = ({ open, onClose, onConfirm }: ModalTambahStrukturProps) => {
  const { form, handleChange, handleImageChange, disableConfirm, image, setForm, setImage } =
    useModalTambahStruktur();
  return (
    <ModalDefault
      open={open}
      onClose={() => {
        setForm({ nama: '', jabatan: '', quote: '', foto: '' });
        setImage(null);
        onClose();
      }}
      fotterConfirm="Tambah"
      fotterCancel="Batal"
      onConfirm={() => {
        onConfirm({ ...form, image: image || undefined });
        setForm({ nama: '', jabatan: '', quote: '', foto: '' });
        setImage(null);
        onClose();
      }}
      onCancel={() => {
        setForm({ nama: '', jabatan: '', quote: '', foto: '' });
        setImage(null);
        onClose();
      }}
      title="Tambah Struktur"
      isDisableConfirm={disableConfirm}
    >
      <div className="flex flex-col gap-4">
        <Text label="Nama" />
        <TextField
          name="nama"
          value={form.nama}
          onChange={e => handleChange(e.target.value, 'nama')}
          placeholder="Nama"
        />
        <Text label="Jabatan" />
        <TextField
          name="jabatan"
          value={form.jabatan}
          onChange={e => handleChange(e.target.value, 'jabatan')}
          placeholder="Jabatan"
        />
        <Text label="Foto" />
        <UploadImage
          onChange={image => {
            handleImageChange(image);
          }}
          value={form.foto}
        />
        <Text label="Quote" />
        <TextAreaDefault
          placeholder="Quote"
          minRows={4}
          name="quote"
          value={form.quote || ''}
          onChange={e => handleChange(e.target.value, 'quote')}
        />
      </div>
    </ModalDefault>
  );
};

export default ModalTambahStruktur;

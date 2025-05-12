import TextAreaDefault from '@/components/input/text-area-default/TextAreaDefault';
import Text from '@/components/text';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import InputHtml from '@/components/input/input-html';
import UploadImage from '@/components/input/upload-image';
import { ProductType } from '@/enum';
import useController from '../libs/useController';
const Content = () => {
  const { form, handleChange, setImage, disabled, handleSubmit, id, imageUrl } = useController();
  return (
    <div className="flex flex-col gap-4">
      <Text label={id ? 'Edit Produk' : 'Tambah Produk'} variant="h1" />
      <div className="flex flex-row border-b border-gray-200 py-8 mt-8 gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Nama Produk (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <TextField
            value={form.judul}
            onChange={e => handleChange(e.target.value, 'judul')}
            size="small"
            placeholder="Masukkan nama produk"
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-row border-b border-gray-200 py-8  gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Deskripsi (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <TextAreaDefault
            value={form.deskripsi}
            onChange={e => handleChange(e.target.value, 'deskripsi')}
            placeholder="Masukkan deskripsi produk"
            minRows={4}
          />
        </div>
      </div>
      <div className="flex flex-row border-b border-gray-200 py-8  gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Konten (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col mb-12 gap-2">
          <InputHtml
            value={form.content}
            onChange={value => handleChange(value, 'content')}
            placeholder="Masukkan konten"
          />
        </div>
      </div>
      <div className="flex flex-row border-b border-gray-200 py-8  gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Foto (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <UploadImage onChange={value => setImage(value)} value={imageUrl as string} />
        </div>
      </div>
      <div className="flex flex-row border-b border-gray-200 py-8  gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Tipe (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <Select
            size="small"
            onChange={event => {
              handleChange(event.target.value, 'tipe');
            }}
            value={form.tipe}
            defaultValue={''}
          >
            <MenuItem disabled value={''}>
              Pilih Tipe
            </MenuItem>
            <MenuItem value={ProductType.TABUNGAN}>TABUNGAN</MenuItem>
            <MenuItem value={ProductType.DEPOSITO}>DEPOSITO</MenuItem>
            <MenuItem value={ProductType.KREDIT}>KREDIT</MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex justify-center py-20">
        <Button
          onClick={handleSubmit}
          className="w-fit"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default Content;

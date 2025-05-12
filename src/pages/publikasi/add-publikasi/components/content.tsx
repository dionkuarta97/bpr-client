import TextAreaDefault from '@/components/input/text-area-default/TextAreaDefault';
import Text from '@/components/text';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import InputHtml from '@/components/input/input-html';
import UploadImage from '@/components/input/upload-image';
import { TipePublikasi } from '@/enum';
import useController from '../libs/useController';
import { FaTrash, FaUpload } from 'react-icons/fa';
const Content = () => {
  const {
    form,
    handleChange,
    setImage,
    disabled,
    handleSubmit,
    id,
    imageUrl,
    setPdf,
    pdfUrl,
    setPdfUrl,
  } = useController();
  return (
    <div className="flex flex-col gap-4">
      <Text label={id ? 'Edit Publikasi' : 'Tambah Publikasi'} variant="h1" />
      <div className="flex flex-row border-b border-gray-200 py-8 mt-8 gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          <Text label="Judul (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <TextField
            value={form.judul}
            onChange={e => handleChange(e.target.value, 'judul')}
            size="small"
            placeholder="Masukkan judul publikasi"
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
            placeholder="Masukkan deskripsi publikasi"
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
          <Text label="Tahun (wajib)" variant="h5" />
        </div>
        <div className="flex w-3/4 flex-col gap-2">
          <TextField
            value={form.tahun}
            onChange={e => {
              // Hanya izinkan karakter angka
              const value = e.target.value;
              if (value.length > 4) {
                return;
              }
              if (value === '' || /^[0-9]+$/.test(value)) {
                handleChange(value, 'tahun');
              }
            }}
            size="small"
            placeholder="contoh: 2024"
            fullWidth
          />
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
            <MenuItem value={TipePublikasi.LAPORAN}>LAPORAN</MenuItem>
            <MenuItem value={TipePublikasi.BERITA}>BERITA</MenuItem>
            <MenuItem value={TipePublikasi.PENGUMUMAN}>PENGUMUMAN</MenuItem>
          </Select>
        </div>
      </div>

      {form.tipe === TipePublikasi.LAPORAN && (
        <div className="flex flex-row border-b border-gray-200 py-8  gap-4">
          <div className="flex w-1/4 flex-col gap-2">
            <Text label="Upload PDF (wajib)" variant="h5" />
          </div>
          <div className="flex w-3/4 flex-col gap-2">
            {!pdfUrl ? (
              <Button
                className="w-fit"
                startIcon={<FaUpload />}
                variant="outlined"
                component="label"
              >
                Upload
                <input
                  accept="application/pdf"
                  type="file"
                  className="hidden"
                  onChange={e => {
                    setPdf(e.target.files?.[0] as File);
                    setPdfUrl(URL.createObjectURL(e.target.files?.[0] as Blob));
                  }}
                />
              </Button>
            ) : (
              <div className="flex flex-row items-center gap-4">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined" color="warning">
                    Lihat Laporan PDF
                  </Button>
                </a>
                <Button
                  onClick={() => {
                    setPdf(null);
                    setPdfUrl(null);
                  }}
                  startIcon={<FaTrash />}
                  variant="outlined"
                  color="error"
                >
                  Hapus
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

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

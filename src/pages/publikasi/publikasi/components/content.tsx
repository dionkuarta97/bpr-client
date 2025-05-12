import DataTable from '@/components/table';
import useController from '../libs/useController';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { TipePublikasi } from '@/enum';
import Text from '@/components/text';
import { FaPlus } from 'react-icons/fa';
import ModalDefault from '@/components/modal';
const Content = () => {
  const {
    columns,
    rows,
    pagination,
    tipe,
    navigate,
    open,
    handleClose,
    handleDelete,
    tahunData,
    tahun,
    handleParamsChange,
    handleResetFilter,
  } = useController();

  return (
    <div>
      <div className="flex flex-row gap-4 py-8">
        <div className="flex flex-col gap-2">
          <Text label="Filter by Tipe" variant="h5" />
          <Select
            size="small"
            value={tipe.length > 0 ? tipe : 'semua'}
            onChange={event => {
              handleParamsChange('tipe', event.target.value);
            }}
          >
            <MenuItem value="semua">Semua</MenuItem>
            <MenuItem value={TipePublikasi.LAPORAN}>LAPORAN</MenuItem>
            <MenuItem value={TipePublikasi.BERITA}>BERITA</MenuItem>
            <MenuItem value={TipePublikasi.PENGUMUMAN}>PENGUMUMAN</MenuItem>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Text label="Filter by Tahun" variant="h5" />
          <Select
            size="small"
            value={tahun != '' ? tahun : 'semua'}
            onChange={event => {
              handleParamsChange('tahun', event.target.value);
            }}
          >
            <MenuItem value="semua">Semua</MenuItem>
            {tahunData?.map((tahun: string) => (
              <MenuItem value={tahun}>{tahun}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Text label="Reset Filter" variant="h5" />
          <Button
            size="large"
            variant="outlined"
            color="error"
            onClick={() => {
              handleResetFilter();
            }}
          >
            Reset
          </Button>
        </div>
        <div className="mt-auto ml-8">
          <Button
            size="large"
            startIcon={<FaPlus />}
            variant="contained"
            color="primary"
            onClick={() => navigate('/publikasi/tambah')}
          >
            Tambah
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        metadata={{
          page: pagination?.page ?? 1,
          total: pagination?.total ?? 0,
          perPage: pagination?.perPage ?? 10,
          total_page: pagination?.total_page ?? 0,
        }}
      />
      <ModalDefault
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
        fotterCancel="Batal"
        fotterConfirm="Hapus"
        title="Hapus Publikasi"
      >
        <div className="flex items-center justify-center p-8">
          <Text
            label="Apakah anda yakin ingin menghapus publikasi ini?"
            className="text-center"
            variant="h2"
          />
        </div>
      </ModalDefault>
    </div>
  );
};

export default Content;

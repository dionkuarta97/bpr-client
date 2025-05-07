import DataTable from '@/components/table';
import useController from '../libs/useController';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { ProductType } from '@/enum';
import Text from '@/components/text';
import { FaPlus } from 'react-icons/fa';
const Content = () => {
  const { columns, rows, pagination, tipe, navigate, params } = useController();

  return (
    <div>
      <div className="flex flex-row py-8">
        <div className="flex flex-col gap-2">
          <Text label="Filter by Tipe" variant="h5" />
          <Select
            size="small"
            value={tipe.length > 0 ? tipe : 'semua'}
            onChange={event => {
              if (event.target.value === 'semua') {
                if (params.get('page')) {
                  navigate(`?page=${params.get('page')}`);
                } else {
                  navigate(``);
                }
              } else {
                if (params.get('page')) {
                  navigate(`?tipe=${event.target.value}&page=${params.get('page')}`);
                } else {
                  navigate(`?tipe=${event.target.value}`);
                }
              }
            }}
          >
            <MenuItem value="semua">Semua</MenuItem>
            <MenuItem value={ProductType.TABUNGAN}>TABUNGAN</MenuItem>
            <MenuItem value={ProductType.DEPOSITO}>DEPOSITO</MenuItem>
            <MenuItem value={ProductType.KREDIT}>KREDIT</MenuItem>
          </Select>
        </div>
        <div className="mt-auto ml-8">
          <Button
            size="large"
            startIcon={<FaPlus />}
            variant="contained"
            color="primary"
            onClick={() => navigate('/produk-layanan/tambah')}
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
    </div>
  );
};

export default Content;

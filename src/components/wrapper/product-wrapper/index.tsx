import { Button } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import useController from './libs/useController';
const ProductWrapper = () => {
  const { goBack, location } = useController();
  return (
    <div className="flex flex-col w-full gap-4">
      {location.pathname !== '/produk-layanan' && (
        <div>
          <Button startIcon={<FaArrowLeft />} color="primary" variant="outlined" onClick={goBack}>
            Kembali
          </Button>
        </div>
      )}
      <div className="flex flex-col w-full p-8 rounded-lg shadow-md bg-white min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductWrapper;

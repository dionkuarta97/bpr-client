import Text from '@/components/text';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';
import useController from '../libs/useController';
import Visi from './Visi';
import Misi from './Misi';
import { Button } from '@mui/material';
const Content = () => {
  const {
    data,
    isEdit,
    handleEdit,
    handleSave,
    handleChangeVisi,
    visi,
    handleChangeMisi,
    misi,
    handleSaveMisi,
    handleDeleteMisi,
  } = useController();
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-row w-full border-b pb-20 border-border-secondary">
        <div className="flex flex-row items-start justify-start gap-2 w-1/4">
          <Text label="Visi" variant="h2" />
        </div>
        <div className="flex flex-col items-start justify-center gap-4 w-3/4">
          <Visi
            visi={visi || ''}
            isEdit={isEdit}
            handleChangeVisi={value => handleChangeVisi(value)}
          />
          <Button
            startIcon={isEdit ? <FaRegSave /> : <FaRegEdit />}
            variant={isEdit ? 'contained' : 'outlined'}
            onClick={isEdit ? handleSave : handleEdit}
          >
            {isEdit ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>
      <div className="flex flex-row w-full w-full">
        <div className="flex flex-row items-start justify-start gap-2 w-1/4">
          <Text label="Misi" variant="h2" />
        </div>
        <div className="flex flex-col items-start justify-center gap-4 w-3/4">
          <Misi
            misi={data?.misi || []}
            handleChangeMisi={(value, target) => handleChangeMisi(value, target)}
            formMisi={misi}
            handleSaveMisi={() => handleSaveMisi()}
            handleDeleteMisi={handleDeleteMisi}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;

import ReactQuill from 'react-quill-new';
import useController from '../libs/useController';
import 'react-quill/dist/quill.bubble.css';
import Text from '@/components/text';
import { Button, Chip } from '@mui/material';

const Content = () => {
  const { data } = useController();
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col border-b border-gray-200 pb-4 mb-4 gap-2">
        <div className="flex flex-row items-center gap-4">
          <Text label={data?.data.judul || ''} variant="h1" />
          <Chip size="small" label={data?.data.tipe} variant="filled" color="primary" />
        </div>
        <Text
          label={'tahun ' + data?.data.tahun || ''}
          variant="body1"
          className="text-gray-500 font-bold"
        />
        <Text label={data?.data.deskripsi || ''} variant="body1" className="text-gray-500" />
      </div>
      {data?.data.pdfPath && (
        <div className="flex items-center justify-center m-20 flex-row gap-4">
          <Text label="PDF" variant="h2" />
          <a href={data?.data.pdfPath} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined" color="warning">
              Lihat Laporan PDF
            </Button>
          </a>
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        <img src={data?.data.foto || ''} alt="gambar" className="w-auto h-100 object-cover" />
      </div>

      <div className="flex flex-col mt-20 gap-4">
        <Text label="Deskripsi" variant="h2" />
        <ReactQuill value={data?.data.content || ''} readOnly={true} theme={'bubble'} />
      </div>
    </div>
  );
};

export default Content;

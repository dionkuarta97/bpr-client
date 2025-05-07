import { Button } from '@mui/material';
import { useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';

interface UploadImageProps {
  onChange: (image: File | null) => void;
  value?: string;
}

const UploadImage = ({ onChange, value }: UploadImageProps) => {
  const [image, setImage] = useState<string | null>(value || null);
  return (
    <div className="flex border-2 bg-[#ECEFF1] border-gray-300 rounded-[15px] items-center justify-center h-60">
      {image ? (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <img src={image} alt="upload" className="w-auto h-40 rounded-md object-cover" />
          <Button
            startIcon={<FaTrash />}
            variant="outlined"
            color="error"
            onClick={() => {
              setImage(null);
              onChange(null);
            }}
          >
            Hapus
          </Button>
        </div>
      ) : (
        <Button startIcon={<FaUpload />} variant="outlined" component="label">
          Upload
          <input
            accept="image/*"
            type="file"
            className="hidden"
            onChange={e => {
              if (e.target.files) {
                setImage(URL.createObjectURL(e.target.files[0]));
                onChange(e.target.files[0]);
              }
            }}
          />
        </Button>
      )}
    </div>
  );
};

export default UploadImage;

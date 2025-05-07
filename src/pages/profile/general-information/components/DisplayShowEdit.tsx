import Text from '@/components/text';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
interface DisplayShowEditProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
  name: string;
  placeholder?: string;
}
const DisplayShowEdit = ({
  label,
  value,
  onChange,
  isEdit,
  placeholder,
  name,
}: DisplayShowEditProps) => {
  return (
    <div
      className={`flex flex-row w-full gap-2 border-b items-center border-border-secondary ${
        isEdit ? 'py-12' : 'py-15'
      }`}
    >
      <div className="w-2/8">
        <Text label={label} className="text-text-primary text-xl" />
      </div>
      <div className="w-5/8">
        {isEdit ? (
          <TextField
            name={name}
            value={value}
            className="text-text-gray w-full text-xl"
            variant="outlined"
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <Text
            label={value || placeholder || ''}
            className={`${value ? 'text-text-gray' : 'text-text-gray-light font-normal'} text-xl`}
            variant="h2"
          />
        )}
      </div>
    </div>
  );
};

export default DisplayShowEdit;

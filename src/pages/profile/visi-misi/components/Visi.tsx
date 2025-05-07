import TextAreaDefault from '@/components/input/text-area-default/TextAreaDefault';
import Text from '@/components/text';

interface VisiProps {
  visi: string;
  isEdit: boolean;
  handleChangeVisi: (value: string) => void;
}

const Visi = ({ visi, isEdit, handleChangeVisi }: VisiProps) => {
  return (
    <div className="flex flex-col w-full">
      {isEdit ? (
        <TextAreaDefault
          placeholder="input visi"
          minRows={3}
          onChange={e => handleChangeVisi(e.target.value)}
          value={visi}
          name="visi"
        />
      ) : (
        <Text
          label={visi || 'visi belum ditulis'}
          className={`${visi ? 'text-text-primary-default' : 'text-text-gray-light'}`}
          variant="h2"
        />
      )}
    </div>
  );
};

export default Visi;

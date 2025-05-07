interface TextAreaDefaultProps {
  placeholder: string;
  minRows: number;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => void;
}

const TextAreaDefault = ({ placeholder, minRows, value, onChange, name }: TextAreaDefaultProps) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={minRows}
      className="w-full border focus:outline-none  border-gray-300 focus:border-2  bg-[#ECEFF1] focus:border-primary-default rounded-[15px] p-2"
      value={value}
      onChange={e => onChange && onChange(e, name as string)}
    />
  );
};

export default TextAreaDefault;

import DisplayShowEdit from './components/DisplayShowEdit';
import useController from './libs/useController';
import Text from '@/components/text';
import { FaEdit, FaSave } from 'react-icons/fa';
const GeneralInformation = () => {
  const { isEdit, handleEdit, handleChange, form, handleSave } = useController();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 justify-center items-end w-full border-b border-border-secondary pb-10">
        <div
          onClick={isEdit ? handleSave : handleEdit}
          className={`flex cursor-pointer hover:scale-105 flex-row w-fit ${
            isEdit ? 'bg-primary-default' : 'bg-white border border-border-secondary'
          } px-4 py-2 rounded-full gap-2`}
        >
          {isEdit ? (
            <FaSave className="text-text-on-primary text-2xl" />
          ) : (
            <FaEdit className="text-text-gray text-2xl" />
          )}
          <Text
            label={isEdit ? 'Save' : 'Edit'}
            className={`${isEdit ? 'text-text-on-primary' : 'text-text-gray'}`}
            variant="h3"
          />
        </div>
      </div>
      <DisplayShowEdit
        label="Nama Bank"
        name="name"
        value={form?.name as string}
        onChange={handleChange}
        isEdit={isEdit}
      />
      <DisplayShowEdit
        label="Alamat Bank"
        name="alamat"
        value={form?.alamat as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan alamat bank"
      />
      <DisplayShowEdit
        label="Nomor Handphone"
        name="no_hp"
        value={form?.no_hp as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan nomor handphone"
      />
      <DisplayShowEdit
        label="Email"
        name="email"
        value={form?.email as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan email"
      />
      <DisplayShowEdit
        label="Sejarah"
        name="sejarah"
        longText={true}
        value={form?.sejarah as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan sejarah"
      />
      <DisplayShowEdit
        label="Link Facebook"
        name="link_fb"
        value={form?.link_fb as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan link facebook"
      />
      <DisplayShowEdit
        label="Link Instagram"
        name="link_ig"
        value={form?.link_ig as string}
        onChange={handleChange}
        isEdit={isEdit}
        placeholder="Masukkan link instagram"
      />
    </div>
  );
};

export default GeneralInformation;

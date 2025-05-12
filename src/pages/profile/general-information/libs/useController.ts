import useGetGeneralInformation from '@/hooks/profile/useGetGeneralInformation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GeneralInformationRequest } from '@/interface';
import useMutationGeneralInfo from '@/hooks/profile/useMutationGeneralInfo';
const useController = () => {
  const { data, isLoading, error } = useGetGeneralInformation();
  const [isEdit, setIsEdit] = useState(false);
  const { updateGeneralInfo } = useMutationGeneralInfo();
  const [form, setForm] = useState<GeneralInformationRequest>(
    data?.data as GeneralInformationRequest
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, name?: string) => {
      if (name) {
        setForm({ ...form, [name]: e.target.value });
      } else {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    },
    [form]
  );
  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, [isEdit]);

  const handleSave = useCallback(() => {
    if (form === data?.data) {
      setIsEdit(false);
      return;
    }
    updateGeneralInfo(form);
    setIsEdit(false);
  }, [form, data?.data]);

  useEffect(() => {
    setForm(data?.data as GeneralInformationRequest);
  }, [data, isEdit]);
  return { isLoading, error, isEdit, handleEdit, handleChange, form, handleSave };
};

export default useController;

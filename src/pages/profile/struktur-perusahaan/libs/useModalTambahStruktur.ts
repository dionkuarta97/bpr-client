import { CreateStrukturPerusahaanRequest } from '@/interface/profile/request';
import { useState, useCallback, useMemo } from 'react';

const useModalTambahStruktur = () => {
  const [form, setForm] = useState<CreateStrukturPerusahaanRequest>({
    nama: '',
    jabatan: '',
    foto: '',
    quote: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = useCallback(
    (value: string, name: string) => {
      setForm({ ...form, [name]: value });
    },
    [form]
  );

  const handleImageChange = useCallback(
    (image: File | null) => {
      if (image) {
        setImage(image);
        setForm({ ...form, foto: URL.createObjectURL(image) });
      } else {
        setImage(null);
        setForm({ ...form, foto: '' });
      }
    },
    [form]
  );

  const disableConfirm = useMemo(() => {
    return form.nama === '' || form.jabatan === '' || image === null;
  }, [form, image]);

  return { form, image, handleChange, handleImageChange, disableConfirm, setForm, setImage };
};

export default useModalTambahStruktur;

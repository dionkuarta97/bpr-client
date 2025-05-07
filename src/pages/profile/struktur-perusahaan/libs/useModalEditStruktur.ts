import { CreateStrukturPerusahaanRequest } from '@/interface/profile/request';
import useAuthStore from '@/store';
import { useState, useCallback, useMemo, useEffect } from 'react';

const useModalEditStruktur = () => {
  const { editStruktur } = useAuthStore();

  const [form, setForm] = useState<CreateStrukturPerusahaanRequest>({
    nama: editStruktur?.nama ?? '',
    jabatan: editStruktur?.jabatan ?? '',
    foto: editStruktur?.foto ?? '',
    quote: editStruktur?.quote ?? '',
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

  useEffect(() => {
    setForm({
      nama: editStruktur?.nama ?? '',
      jabatan: editStruktur?.jabatan ?? '',
      foto: editStruktur?.foto ?? '',
      quote: editStruktur?.quote ?? '',
    });
    setImage(
      editStruktur?.foto
        ? new File([editStruktur.foto], editStruktur.foto.split('/').pop()?.split('.')[0] ?? '', {
            type: 'image/jpeg',
          })
        : null
    );
  }, [editStruktur]);
  const disableConfirm = useMemo(() => {
    return form.nama === '' || form.jabatan === '' || image === null;
  }, [form, image, editStruktur]);

  return { form, image, handleChange, handleImageChange, disableConfirm, setForm, setImage };
};

export default useModalEditStruktur;

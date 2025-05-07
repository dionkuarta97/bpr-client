import { useMemo, useState } from 'react';
import useMutationCreateProduct from '@/hooks/product/useMutationCreateProduct';
import { ProductRequest } from '@/interface/product/request';
import { useNavigate } from 'react-router-dom';
const useController = () => {
  const { createProduct } = useMutationCreateProduct();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    judul: '',
    content: '',
    deskripsi: '',
    tipe: '',
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (value: string, key: string) => {
    setForm({ ...form, [key]: value });
  };

  console.log(form, image);

  const disabled = useMemo(() => {
    return (
      form.judul === '' ||
      form.content === '' ||
      form.deskripsi === '' ||
      form.tipe === '' ||
      image === null
    );
  }, [form, image]);

  const handleSubmit = async () => {
    const data: ProductRequest = {
      judul: form.judul,
      content: form.content,
      deskripsi: form.deskripsi,
      tipe: form.tipe,
      image: image as File,
    };

    await createProduct(data, {
      onSuccess: () => {
        setForm({
          judul: '',
          content: '',
          deskripsi: '',
          tipe: '',
        });
        setImage(null);
        navigate('/produk-layanan');
      },
    });
  };

  return { form, setForm, handleChange, image, setImage, disabled, handleSubmit };
};

export default useController;

import { useEffect, useMemo, useState } from 'react';
import useMutationCreateProduct from '@/hooks/product/useMutationCreateProduct';
import { ProductRequest } from '@/interface/product/request';
import { useNavigate, useParams } from 'react-router-dom';
import useGetDetailProduct from '@/hooks/product/useGetDetailProduct';
import useMutationUpdateProduct from '@/hooks/product/useMutationUpdateProduct';
import { ProductType } from '@/enum';
const useController = () => {
  const { createProduct } = useMutationCreateProduct();
  const { id } = useParams();
  const { data } = useGetDetailProduct(id as string);

  const { updateProduct } = useMutationUpdateProduct();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    judul: '',
    content: '',
    deskripsi: '',
    tipe: '',
  });
  console.log(data);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleChange = (value: string, key: string) => {
    setForm({ ...form, [key]: value });
  };

  console.log(id);

  const disabled = useMemo(() => {
    if (!id) {
      return (
        form.judul === '' ||
        form.content === '' ||
        form.deskripsi === '' ||
        form.tipe === '' ||
        image === null
      );
    }
    return false;
  }, [form, image]);

  const handleSubmit = async () => {
    const data: ProductRequest = {
      judul: form.judul,
      content: form.content,
      deskripsi: form.deskripsi,
      tipe: form.tipe as ProductType,
      image: image as File,
    };
    if (!id) {
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
    } else {
      let dataUpdate: ProductRequest = {
        judul: form.judul,
        content: form.content,
        deskripsi: form.deskripsi,
        tipe: form.tipe as ProductType,
        image: null,
      };
      if (image) {
        dataUpdate.image = image as File;
      }
      await updateProduct({ data: dataUpdate, id: id as string });
      navigate('/produk-layanan');
    }
  };

  useEffect(() => {
    if (data) {
      setForm(data.data);
      setImageUrl(data.data.foto);
    }
  }, [data]);

  return { form, setForm, handleChange, image, setImage, disabled, handleSubmit, id, imageUrl };
};

export default useController;

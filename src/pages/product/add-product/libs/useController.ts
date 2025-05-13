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
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleChange = (value: string, key: string) => {
    setForm({ ...form, [key]: value });
  };

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

  const contentHtml = useMemo(() => {
    if (data?.data.content) {
      let content = data.data.content;
      if (!/^<.*?>/.test(content.trim())) {
        content = `<p>${content}</p>`;
      }
      return content;
    }
    return '<p></p>';
  }, [data?.data.content]);

  useEffect(() => {
    if (data) {
      setForm({
        judul: data.data.judul,
        content: contentHtml,
        deskripsi: data.data.deskripsi,
        tipe: data.data.tipe,
      });
      setImageUrl(data.data.foto);
    }
  }, [data?.data, contentHtml]);

  useEffect(() => {
    console.log('FORM TERUPDATE:', form);
  }, [form]);

  return { form, setForm, handleChange, image, setImage, disabled, handleSubmit, id, imageUrl };
};

export default useController;

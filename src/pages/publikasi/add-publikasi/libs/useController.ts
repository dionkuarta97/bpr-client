import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetDetailPublikasi from '@/hooks/publikasi/useGetDetailPublikasi';
import useMutationCreatePublikasi from '@/hooks/publikasi/useMutationCreatePublikasi';
import useMutationUpdatePublikasi from '@/hooks/publikasi/useMutationUpdatePublikasi';
import { PublikasiRequest } from '@/interface/publikasi/request';
import { TipePublikasi } from '@/enum';
const useController = () => {
  const { createPublikasi } = useMutationCreatePublikasi();
  const { id } = useParams();
  const { data } = useGetDetailPublikasi(id as string);

  const { updatePublikasi } = useMutationUpdatePublikasi();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    judul: '',
    content: '',
    deskripsi: '',
    tipe: '',
    tahun: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const handleChange = (value: string, key: string) => {
    setForm({ ...form, [key]: value });
  };

  const disabled = useMemo(() => {
    if (!id) {
      if (form.tipe === TipePublikasi.LAPORAN) {
        return (
          form.judul === '' ||
          form.content === '' ||
          form.deskripsi === '' ||
          form.tahun === '' ||
          image === null ||
          pdf === null
        );
      }
      return (
        form.judul === '' ||
        form.content === '' ||
        form.deskripsi === '' ||
        form.tipe === '' ||
        form.tahun === '' ||
        image === null
      );
    }
    return false;
  }, [form, image, pdf]);

  const handleSubmit = async () => {
    let data: PublikasiRequest = {
      judul: form.judul,
      content: form.content,
      deskripsi: form.deskripsi,
      tipe: form.tipe as TipePublikasi,
      image: image as File,
      pdf: null,
      tahun: form.tahun,
    };
    if (form.tipe === TipePublikasi.LAPORAN) {
      data.pdf = pdf as File;
    }
    if (!id) {
      await createPublikasi(data, {
        onSuccess: () => {
          setForm({
            judul: '',
            content: '',
            deskripsi: '',
            tipe: '',
            tahun: '',
          });
          setImage(null);
          setPdf(null);
          navigate('/publikasi');
        },
      });
    } else {
      let dataUpdate: PublikasiRequest = {
        judul: form.judul,
        content: form.content,
        deskripsi: form.deskripsi,
        tipe: form.tipe as TipePublikasi,
        image: null,
        pdf: null,
        tahun: form.tahun,
      };
      if (image) {
        dataUpdate.image = image as File;
      }
      if (pdf) {
        dataUpdate.pdf = pdf as File;
      }
      await updatePublikasi({ data: dataUpdate, id: id as string });
      navigate('/publikasi');
    }
  };

  useEffect(() => {
    if (data) {
      setForm({
        judul: data.data.judul,
        content: data.data.content || '',
        deskripsi: data.data.deskripsi,
        tipe: data.data.tipe,
        tahun: data.data.tahun || '',
      });
      setImageUrl(data.data.foto);
      setPdfUrl(data.data.pdfPath);
    }
  }, [data]);

  useEffect(() => {
    if (form.tipe !== TipePublikasi.LAPORAN) {
      setPdf(null);
    }
  }, [form.tipe]);

  return {
    form,
    setForm,
    handleChange,
    image,
    setImage,
    disabled,
    handleSubmit,
    id,
    imageUrl,
    pdf,
    setPdf,
    pdfUrl,
    setPdfUrl,
  };
};

export default useController;

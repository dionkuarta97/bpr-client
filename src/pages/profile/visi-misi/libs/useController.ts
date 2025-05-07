import useGetVisiMisi from '@/hooks/profile/useGetVisiMisi';
import useMutationUpdateVisi from '@/hooks/profile/useMutationUpdateVisi';
import { useState, useCallback, useEffect } from 'react';
import useMutationCreateMisi from '@/hooks/profile/useMutationCreateMisi';
import { CreateMisiRequest } from '@/interface/profile/request';
import { queryClient } from '@/app';
import useMutationDeleteMisi from '@/hooks/profile/useMutationDeleteMisi';
const useController = () => {
  const { data, refetch } = useGetVisiMisi();
  const [isEdit, setIsEdit] = useState(false);
  const { updateVisi } = useMutationUpdateVisi();
  const [visi, setVisi] = useState(data?.data?.visi);
  const { createMisi } = useMutationCreateMisi();
  const { deleteMisi } = useMutationDeleteMisi();
  const [misi, setMisi] = useState<CreateMisiRequest>({
    judul: '',
    deskripsi: '',
  });

  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, [isEdit]);

  const handleSave = useCallback(() => {
    if (visi === data?.data?.visi) {
      setIsEdit(false);
      return;
    }
    updateVisi({ visi: visi || '' });
    setIsEdit(false);
  }, [visi, data?.data?.visi]);

  const handleChangeVisi = useCallback((value: string) => {
    setVisi(value);
  }, []);

  const handleChangeMisi = useCallback((value: string, target: string) => {
    setMisi(prev => ({ ...prev, [target]: value }));
  }, []);

  const handleSaveMisi = useCallback(async () => {
    await createMisi([misi], {
      onSuccess: async () => {
        queryClient.removeQueries({
          queryKey: ['visi-misi'],
        });
        await refetch();
      },
    });
  }, [misi]);

  const handleDeleteMisi = useCallback(async (id: string) => {
    await deleteMisi(id, {
      onSuccess: async () => {
        queryClient.removeQueries({
          queryKey: ['visi-misi'],
        });
        await refetch();
      },
    });
  }, []);

  useEffect(() => {
    setVisi(data?.data?.visi);
  }, [data]);

  return {
    data: data?.data,
    isEdit,
    handleEdit,
    handleSave,
    visi,
    handleChangeVisi,
    misi,
    handleChangeMisi,
    handleSaveMisi,
    handleDeleteMisi,
  };
};

export default useController;

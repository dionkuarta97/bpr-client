import { queryClient } from '@/app';
import { admin } from '@/axios';
import { toast } from '@/components/toast';
import {
  GeneralInformationRequest,
  GeneralInformationResponse,
  SuccessResponse,
} from '@/interface';
import { useMutation } from '@tanstack/react-query';

const updateGeneralInfo = async (data: GeneralInformationRequest) => {
  const response = await admin.post<SuccessResponse<GeneralInformationResponse>>(
    '/profile/update-general-info',
    data
  );
  return response.data;
};

const useMutationGeneralInfo = () => {
  const { mutateAsync } = useMutation({
    mutationFn: updateGeneralInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['general-information'] });
      toast.success('Berhasil', 'Berhasil mengubah informasi umum');
    },
    onError: (e: Error) => {
      toast.error('Gagal', e.message || 'Gagal mengubah informasi umum');
    },
  });

  return {
    updateGeneralInfo: mutateAsync,
  };
};

export default useMutationGeneralInfo;

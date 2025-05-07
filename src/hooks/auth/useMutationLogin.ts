import { useMutation } from '@tanstack/react-query';
import { publicApi } from '@/axios';
import { LoginRequest, LoginResponse, SuccessResponse } from '@/interface';

const postLogin = async (data: LoginRequest): Promise<SuccessResponse<LoginResponse>> => {
  const response = await publicApi.post('/login', data);
  return response.data;
};

const useMutationLogin = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postLogin,
    onSuccess: data => {
      console.log(data.data);
    },
  });

  return {
    mutateAsync,
  };
};

export default useMutationLogin;

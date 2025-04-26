import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/axios';
import { LoginRequest, LoginResponse, SuccessResponse } from '@/interface';

const postLogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post<SuccessResponse<LoginResponse>>('/public/login', data);
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

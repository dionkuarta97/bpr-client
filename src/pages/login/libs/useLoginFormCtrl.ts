import { LoginRequest } from '@/interface';
import { useState } from 'react';
import useMutationLogin from '@/hooks/auth/useMutationLogin';
import { toast } from '@/components/toast';
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router-dom';
const useLoginFormCtrl = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSetToken, handleSetUser } = useAuthStore();
  const navigate = useNavigate();
  const { mutateAsync: login } = useMutationLogin();
  const [loginForm, setLoginForm] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const onSubmit = async () => {
    await login(loginForm, {
      onSuccess: data => {
        toast.success(loginForm.username, data.message);
        handleSetToken(data.data.token);
        handleSetUser(data.data.user);
        navigate('/', { replace: true });
      },
      onError: error => {
        toast.error(loginForm.username, error.message);
        console.log(error);
      },
    });
  };

  return { showPassword, setShowPassword, loginForm, setLoginForm, onSubmit };
};

export default useLoginFormCtrl;

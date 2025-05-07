import { useNavigate, useLocation } from 'react-router-dom';

const useController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    navigate(-1);
  };

  return {
    navigate,
    goBack,
    location,
  };
};

export default useController;

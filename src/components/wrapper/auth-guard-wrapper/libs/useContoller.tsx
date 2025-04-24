import { useAtom } from "jotai";
import store from "../../../../store";

const useController = () => {
  const [token] = useAtom(store.auth.token);

  const isAuthenticated = !!token;

  return {
    isAuthenticated,
  };
};

export default useController;

import useOpenClose from '@/hooks/useOpenClose';
import { useCallback, useState } from 'react';
const useMisiController = () => {
  const { open, handleOpen, handleClose } = useOpenClose();
  const [id, setId] = useState<string>('');
  const {
    open: openDelete,
    handleOpen: handleOpenDelete,
    handleClose: handleCloseDelete,
  } = useOpenClose();
  const handleSetId = useCallback((id: string) => {
    setId(id);
  }, []);
  return {
    open,
    handleOpen,
    handleClose,
    openDelete,
    handleOpenDelete,
    handleCloseDelete,
    id,
    handleSetId,
  };
};

export default useMisiController;

import { useCallback, useState } from 'react';

const useOpenClose = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return { open, handleOpen, handleClose };
};

export default useOpenClose;

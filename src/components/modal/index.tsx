import { Dialog, DialogProps, IconButton, Button } from '@mui/material';
import Text from '../text';
import { FaWindowClose } from 'react-icons/fa';

interface ModalDefaultProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fotterCancel?: string;
  fotterConfirm?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isDisableConfirm?: boolean;
}

const ModalDefault = ({
  open,
  onClose,
  children,
  title,
  fotterCancel,
  fotterConfirm,
  onCancel,
  onConfirm,
  isDisableConfirm,
  ...props
}: ModalDefaultProps) => {
  return (
    <Dialog open={open} className="w-full" onClose={onClose} {...props}>
      <div className="flex flex-col min-w-[600px] overflow-hidden">
        <div className="flex flex-row w-full p-2 border-b border-gray-200 items-center justify-between">
          <Text label={title} variant="h2" className="flex-grow text-center" />
          <IconButton className="self-end" onClick={onClose}>
            <FaWindowClose />
          </IconButton>
        </div>
        <div className="flex flex-col w-full p-4 overflow-y-auto max-h-[70vh]">{children}</div>
        {(fotterCancel || fotterConfirm) && (
          <div className="flex flex-row gap-3 w-full p-3 border-t border-gray-200 items-center justify-end">
            {fotterCancel && (
              <Button variant="outlined" onClick={onCancel}>
                {fotterCancel}
              </Button>
            )}
            {fotterConfirm && (
              <Button variant="contained" onClick={onConfirm} disabled={isDisableConfirm}>
                {fotterConfirm}
              </Button>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ModalDefault;

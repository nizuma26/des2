import { forwardRef } from 'react';
//mui
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import useDialogStore from './use-dialog';
import { useResponsive } from '../../hooks/use-responsive';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MuiDialog = () => {
  
  const { isOpen, content, maxWidth, closeDialog, isFullScreen } = useDialogStore();

  const fullScreen = useResponsive('down', 'md');

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      fullScreen={fullScreen || isFullScreen}
      fullWidth
      maxWidth={maxWidth}
      TransitionComponent={isFullScreen ? Transition : undefined}
    >
      {content}
    </Dialog>
  );
};

export default MuiDialog;

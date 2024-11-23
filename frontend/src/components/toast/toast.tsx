//@mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { toast } from 'sonner';

import Label from '../label';
import Iconify from '../iconify';

interface Toast {
  msg: string;
  icon?: string;
  color?: string;
}

export const CloseButton = () => {
  return (
  <IconButton
    aria-label="cerrar"
    size="small"
    sx={{
      position: 'absolute',
      right: 10,
      top: 0,
      borderRadius: '50%',
      zIndex: 10,
    }}
    onClick={() => toast.dismiss()}
  >
    <Iconify icon="iconamoon:close" />
  </IconButton>
)};

export const ToastError = ({ error }: { error: object | string }) => {

  const type = typeof error;

  return (
    <List
      dense={true}
      sx={{ py: 0, width: '100%' }}
      subheader={
        <Stack direction="row" pb={1} width={1}>
          <Label color="error" sx={{ borderRadius: '30%', py: '16px', px: '8px' }}>
            <Iconify icon="fluent:error-circle-12-filled" width={18} sx={{ opacity: 0.86 }} />
          </Label>
          <ListSubheader
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              bgcolor: 'inherit',
              px: 1,
              lineHeight: 0,
            }}
          >
            Ups, ha ocurrido un error.
          </ListSubheader>
          <CloseButton />
        </Stack>
      }
    >
      {type === 'object' ? (

        Object.entries(error).map(([key, value]) => (
          <ListItem sx={{ py: '3px', px: '6px' }} key={key}>
            <ListItemText sx={{ my: 0 }} primary={`${key}: ${value}`} />
          </ListItem>
        ))
      ) : (
        <ListItem sx={{ py: 0 }}>
          <ListItemText sx={{ my: 0 }} primary={String(error)} />
        </ListItem>
      )}
    </List>
  );
};

export const Toast = ({ msg, icon = 'lets-icons:check-round-fill', color = 'success' }: Toast) => {

  return (
    <>
      <Label color={color} sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
        <Iconify icon={icon} width={20} sx={{ opacity: 0.86 }} />
      </Label>
      <Typography typography="subtitle2" color="text.secondary" maxWidth="250px">
        {msg}
      </Typography>
      <CloseButton />
    </>
  );
};

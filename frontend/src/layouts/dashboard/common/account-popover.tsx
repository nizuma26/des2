import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { jwtDecode } from 'jwt-decode';

import { useAuthPrivate } from '../../../auth/hooks/use-auth-private';

import { TokenDecode } from '../../../types';

import { account } from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: 'eva:home-fill',
  },
  {
    label: 'Perfil',
    icon: 'eva:person-fill',
  },
  {
    label: 'Ajustes',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onLogout = () => {
    //logOut();
    window.location.href = '/login';
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={BACKEND_URL + tokenDecode?.image}
          alt={tokenDecode?.username}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {tokenDecode?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {tokenDecode?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box flexDirection="column" display={'flex'} p={1} gap={0.3}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} sx={{ py: 0.9, px: 1.5 }} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            disableRipple
            disableTouchRipple
            sx={{ typography: 'subtitle2', color: 'error.main', px: 1.5 }}
            onClick={() => {
              onLogout(), handleClose();
            }}
          >
            Cerrar Sesión
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
}

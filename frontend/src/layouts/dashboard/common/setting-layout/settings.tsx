import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

import SettingsContainer from './settings-container';

// ----------------------------------------------------------------------

export default function Settings() {
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify width={24} icon="solar:settings-bold-duotone" />
      </IconButton>
      <Drawer
        anchor="right"
        BackdropProps={{ invisible: true }}
        open={open}
        onClose={handleClose}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2, borderBottom: (theme) => `dashed 1px ${theme.palette.divider}` }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Ajustes
          </Typography>
          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" width={20} />
          </IconButton>
        </Stack>

        <Scrollbar>
          <Stack sx={{ p: 3 }}>
            <SettingsContainer />
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            sx={{ border: 1, borderColor: '#eee', color: '#919eab' }}
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" width={20} />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

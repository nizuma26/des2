//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { PresetColor } from './preset-color-options';
import { SidebarOrientation } from './sidebar-orientation';
import ThemeButton from './theme-button';
import NavColorButton from './nav-color-button';

const SettingsContainer = () => (
  <Stack spacing={5}>
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.disabled" fontSize={12}>
        Tema
      </Typography>
      <Stack sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} sx={{ gap: 2 }}>
          <ThemeButton key={1} theme="light" />
          <ThemeButton key={2} theme="dark" />
        </Grid>
      </Stack>
    </Stack>
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.disabled" fontSize={12}>
        Orientación del Menu
      </Typography>
      <Stack sx={{ flexDirection: 'row', gap: '16px' }}>
        <SidebarOrientation key={1} orientation="vertical" />
        <SidebarOrientation key={2} orientation="collapse" />
        <SidebarOrientation key={3} orientation="horizontal" />
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '16px' }}>
        <NavColorButton typeColor='integrate' title='Integrar' />
        <NavColorButton typeColor='apparent' title='Aparentar' />
      </Stack>
    </Stack>
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.disabled" fontSize={12}>
        Color Predeterminado
      </Typography>
      <Box sx={{ display: 'grid', gap: '12px 16px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <PresetColor key={1} colorType="blue" />
        <PresetColor key={2} colorType="success" />
        <PresetColor key={3} colorType="secondary" />
        <PresetColor key={4} colorType="cyan" />
        <PresetColor key={5} colorType="warning" />
        <PresetColor key={6} colorType="error" />
      </Box>
    </Stack>
  </Stack>
);

export default SettingsContainer;

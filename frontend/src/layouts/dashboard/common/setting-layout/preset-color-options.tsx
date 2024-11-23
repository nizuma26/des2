import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useSettingsLayout } from '../../../../store/settings';
import { alpha as hexAlpha } from '@mui/material/styles';

import { PresetsColor } from '../../../../theme/presets-color';

import { blue, success, secondary, warning, error, cyan } from '../../../../theme/presets-color';

import Iconify from '../../../../components/iconify';

interface PresetColorProps {
  colorType: PresetsColor;
}

export function PresetColor({ colorType }: PresetColorProps) {

  const setPresetColor = useSettingsLayout((state: any) => state.setPresetColor);
  const presetColor = useSettingsLayout((state: any) => state.themeColorPresets);

  const isSelected = presetColor === colorType

  const colors = {
    blue: blue.main,
    success: success.main,
    secondary: secondary.main,
    cyan: cyan.main,
    error: error.main,
    warning: warning.main
  }

  const color = colors[colorType]

  return (
    <Button
      sx={{
        border: '1px solid rgba(145, 158, 171, 0.08)',
        backgroundColor: 'transparent',
        height: 56,
      }}
      size="large"
      type="button"
      color="inherit"
      variant="outlined"
      onClick={() => setPresetColor(colorType)}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          width: 20,
          height: 20,
          bgcolor: colors[colorType],
          borderRadius: '50%',
          ...(isSelected && {
            transform: 'scale(1.3)',
            boxShadow: `4px 4px 8px 0 ${hexAlpha(color, 0.30)}`,
            outline: `solid 2px ${hexAlpha(color, 0.08)}`,
            transition: theme.transitions.create('all', {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        })}
      >
        <Iconify
          width={isSelected ? 12 : 0}
          icon="eva:checkmark-fill"
          sx={(theme) => ({
            color: theme.palette.getContrastText(color),
            transition: theme.transitions.create('all', {
              duration: theme.transitions.duration.shortest,
            }),
          })}
        />
      </Stack>
    </Button>
  );
}

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useSettingsLayout } from '../../../../store/settings';

import { linearGradient } from '../../../../utils/hex-to-rgb';
import { NavColor } from '../../../../store/types';
import Typography from '@mui/material/Typography';

interface NavColorButtonProps {
  typeColor: NavColor;
  title: string;
}

export default function NavColorButton({ typeColor, title } : NavColorButtonProps) {
  
  const setNavColor = useSettingsLayout((state) => state.setNavColor);
  const navColor = useSettingsLayout((state) => state.navColor)

  const theme = useTheme();

  const gradient = linearGradient(theme.palette.primary.light, theme.palette.primary.main);
  const selected =
    navColor === typeColor
      ? {
          backgroundColor: gradient,
          boxShadow: 'inherit',
        }
      : {
          backgroundColor: 'transparent',
        };

  return (
    <Button
      sx={{
        border: '1px solid rgba(145, 158, 171, 0.08)',
        color: 'text.disabled',
        transition: 'none',
        padding: 0,
        width: '100%',
        height: '56px',
        ...selected,
      }}
      size="large"
      type="button"
      color="inherit"
      variant="outlined"
      onClick={() => setNavColor(typeColor)}
    >
      <Typography variant='body2'>
        {title}
      </Typography>
    </Button>
  );
};
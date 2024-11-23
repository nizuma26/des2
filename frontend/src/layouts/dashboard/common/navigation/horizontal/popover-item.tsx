import MenuItem from '@mui/material/MenuItem';

import { useRouter } from '../../../../../routes/hooks';

interface subItemProps {
  title: string;
  path: string;
  pathname: string;
  handleCloseMenu: () => void;
}

export default function PopoverItem({ title, path, pathname, handleCloseMenu } : subItemProps) {

    const router = useRouter();

    const goRoute = () => router.replace(path)

    const isActive = path === pathname
  
    return (
      <MenuItem
        sx={{
          typography: 'body2',
          borderRadius: 0.75,
          color: 'text.secondary',
          fontWeight: 'fontWeightMedium',
          px: '8px',
          py: '6px',
          minHeight: 36,
          ...(isActive && {bgcolor: 'action.selected', color: 'text.primary' })
        }}
        onClick={goRoute}
      >        
        {title}
      </MenuItem>
    );
  }

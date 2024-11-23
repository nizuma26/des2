import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import Label from '../../../components/label';
import { RouterLink } from '../../../routes/components';

// ----------------------------------------------------------------------

interface ModuleLinkProps {
  moduleTitle: string;
  sectionTitle: string;
  path: string;
  handleClose: () => void;
}

const ModuleLink = ({ moduleTitle, sectionTitle, path, handleClose } : ModuleLinkProps) => {
  
  return (
    <ListItemButton
      component={RouterLink}
      href={path}
      sx={{
        borderRadius: '8px',
        borderImage: 'initial',
        borderStyle: 'dashed',
        borderWidth: '1px',
        borderColor: 'transparent transparent rgba(145, 158, 171, 0.2)',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          borderColor: 'primary.main',
        },
      }}
      onClick={handleClose}
    >
      <Box flex='1 1 auto'>
        <Box sx={{ fontSize: 14, textAlign: 'left', textTransform: 'capitalize', fontWeight: 'bold'}} component="span">
          {moduleTitle}
        </Box>
        <Typography sx={{ fontSize: 14, textAlign: 'left', color: 'text.secondary' }} component="p">
          {path}
        </Typography>
      </Box>
      <Label color={'primary'}>{sectionTitle}</Label>
    </ListItemButton>
  );
};

export default ModuleLink;

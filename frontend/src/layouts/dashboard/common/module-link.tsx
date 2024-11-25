import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import Label from '../../../components/label';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

interface ModuleLinkProps {
  moduleTitle: string;
  sectionTitle: string;
  path: string;
  handleClose: () => void;
}

const ModuleLink = ({ moduleTitle, sectionTitle, path, handleClose } : ModuleLinkProps) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(path);
    handleClose();
  }
  
  return (
    <ListItemButton
      sx={{
        borderRadius: '8px',
        borderImage: 'initial',
        borderStyle: 'dashed',
        borderWidth: '1px',
        p: 2,
        borderColor: 'transparent transparent rgba(145, 158, 171, 0.2)',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          borderColor: 'primary.main',
        },
      }}
      onClick={handleClick}
    >
      <Box flex='1 1 auto'>
        {}
        <Typography variant='subtitle2'>
          {moduleTitle}
        </Typography>
      </Box>
      <Label color={'primary'}>{sectionTitle}</Label>
    </ListItemButton>
  );
};

export default ModuleLink;

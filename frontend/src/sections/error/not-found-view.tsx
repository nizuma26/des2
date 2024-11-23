import { ReactNode } from 'react';
//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';

import { useRouter } from '../../routes/hooks';

import Logo from '../../components/logo/logo';

// ----------------------------------------------------------------------

interface NotFoundViewProps {
  children: ReactNode;
  titleError: string;
  contentError: string;  
}

export default function NotFoundView({children, titleError, contentError}:NotFoundViewProps) {

  const router = useRouter();

  const back = () => router.back()

  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo sx={{ alignItems: 'center' }} />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            {titleError}            
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {contentError}           
          </Typography>

          <Grow in={true}>
            <Box
              sx={{
                mx: 'auto',
                height: 260,
                my: { xs: 5, sm: 10 },
                color: 'primary.main'
              }}
            >
            {children}
            </Box>
          </Grow>

          <Button size="large" variant="contained" color="inherit" onClick={back}>
            Volver
          </Button>
        </Box>
      </Container>
    </>
  );
}

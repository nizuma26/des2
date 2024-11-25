import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function LoadingScreen({ variant = 'indeterminate' }: { variant?: 'indeterminate' }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
      minHeight={1}
      height='100vh'
      width={1}
    >
      <LinearProgress variant={variant} sx={{ borderRadius: '10px', width: 1, maxWidth: 320 }} />
    </Box>
  );
}

export default LoadingScreen;

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function LoadingScreen({ variant='indeterminate' } : {variant?: 'indeterminate'}) {
  return (
    <Box sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
          <LinearProgress variant={variant} sx={{borderRadius: '10px', width: '40%'}}/>
    </Box>
  )
}

export default LoadingScreen
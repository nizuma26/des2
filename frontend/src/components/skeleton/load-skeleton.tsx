import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const LoadSkeleton = () => (
  <Box sx={{ width: 1, p:6 }}>
    <Skeleton />
    <Skeleton animation="wave" />
    <Skeleton animation={false} />
  </Box>
);

export default LoadSkeleton;

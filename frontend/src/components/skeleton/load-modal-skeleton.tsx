import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type AlignType = 'center' | 'flex-end' | 'flex-start';

interface LoadModalSkeletonProps {
  height?: number | string;
  alignButtons?: AlignType;
  alignTitle?: AlignType;
}

const LoadModalSkeleton = ({
  height = 200,
  alignButtons = 'flex-end',
  alignTitle = 'flex-start',
}: LoadModalSkeletonProps) => (
  <Stack width={1}>
    <Box
      width={1}
      display="flex"
      flexDirection="row"
      gap={1}
      py={1}
      px={2}
      alignItems="center"
      justifyContent={alignTitle}
    >
      <Skeleton animation="wave" width={40} height={60} />
      <Skeleton animation="wave" height={23} width="50%" />
    </Box>
    <Box width={1}>
      <Skeleton sx={{ height: height }} animation="wave" variant="rectangular" />
    </Box>
    <Box width={1} display="flex" flexDirection="row" justifyContent={alignButtons} gap={3} p={2}>
      <Skeleton animation="wave" width={80} height={60} />
      <Skeleton animation="wave" width={80} height={60} />
    </Box>
  </Stack>
);

export default LoadModalSkeleton;

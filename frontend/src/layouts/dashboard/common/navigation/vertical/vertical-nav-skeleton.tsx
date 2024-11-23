import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { SKELETON_CONFIG } from '../../../config-layout';

function VerticalNavSkeleton() {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 0 }}>
        <Skeleton variant="text" animation={SKELETON_CONFIG.GLOBAL.ANIMATION} width={150} />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 0 }}>
        <Skeleton variant="text" animation={SKELETON_CONFIG.GLOBAL.ANIMATION} width={150} />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 0 }}>
        <Skeleton variant="text" animation={SKELETON_CONFIG.GLOBAL.ANIMATION} width={150} />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 0 }}>
        <Skeleton variant="text" animation={SKELETON_CONFIG.GLOBAL.ANIMATION} width={150} />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
        <Skeleton
          variant="rounded"
          height={SKELETON_CONFIG.VERTICAL.ITEM_HEIGHT}
          animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
        />
      </Box>
    </Stack>
  );
}

export default VerticalNavSkeleton;

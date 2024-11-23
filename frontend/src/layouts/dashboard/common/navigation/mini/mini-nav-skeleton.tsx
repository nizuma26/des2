import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { SKELETON_CONFIG } from '../../../config-layout';

function MiniNavSkeleton() {
  return (
    <Stack spacing={2} px={1} pt={3}>
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.MINI.ITEM_HEIGHT}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
    </Stack>
  );
}

export default MiniNavSkeleton;

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { SKELETON_CONFIG } from '../../../config-layout';

const HorizontalNavSkeleton = () => (
    <Stack width={1} direction="row" spacing={4}>
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
      <Skeleton
        variant="rounded"
        height={SKELETON_CONFIG.HORIZONTAL.ITEM_HEIGHT}
        width={SKELETON_CONFIG.HORIZONTAL.ITEM_WIDTH}
        animation={SKELETON_CONFIG.GLOBAL.ANIMATION}
      />
    </Stack>
  );

export default HorizontalNavSkeleton;

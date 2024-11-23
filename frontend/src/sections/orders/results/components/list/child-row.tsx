// @mui
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { bgGradient2 } from '../../../../../theme/css';

import { ChildRowProps } from './types';

import Item from './item';

// --------------------------------------------------

function ChildRow({ order, onClick }: ChildRowProps) {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', py: 0, width: 1, overflow: 'hidden' }}>
      <Typography
        variant="subtitle2"
        sx={{
          ...bgGradient2({
            direction: '180deg',
            startColor: primary.main,
            endColor: primary.dark,
          }),
          color: '#fff',
          px: 2,
          py: 1,          
        }}
      >
        Exámenes
      </Typography>
      {order?.order_detail?.map((labTest) => (
        <Item
          key={labTest.id}
          orderId={order.id}
          labTest={labTest}
          enabledRefetch={false}
          onClick={() => {
            if (labTest.status === 'Procesado') return;
            onClick(order, labTest);
          }}
        />
      ))}
    </Paper>
  );
}

export default ChildRow;

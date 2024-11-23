// @mui
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { LabTest, PendingOrder } from '../../../../../types/orders/result';

import { TABLE_COLUMNS, QUERY_KEYS } from '../../context';

import { useGetData } from '../../../../../hooks/use-get-data';
import { useDialogStore, MuiDialog } from '../../../../../components/dialog';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Iconify from '../../../../../components/iconify';
import LoadCaptureResultDialog from '../form/load-capture-result-dialog';
import ChildRow from './child-row';

// ----------------------------------------------------------------------

export default function PendingOrderTable() {
  const orders = useGetData({
    url: '/api/orders/result/pending-orders/',
    queryKey: [QUERY_KEYS.pendingOrders],
    gcTime: 2 * 60 * 1000
  });

  console.log(orders?.data)

  const showDialog = useDialogStore((state) => state.showDialog);

  const openCaptureResultsDialog = (orderData: PendingOrder, labTestData: LabTest) => {
    showDialog(<LoadCaptureResultDialog orderData={orderData} labTestData={labTestData} />, 'lg', true);
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (order: PendingOrder, rowIndex: number, onCollapse: () => void) => (
        <IconButton onClick={onCollapse}>
          <Iconify icon="ep:arrow-down-bold" width={18} />
        </IconButton>
      ),
    },
    {
      columnIndex: 1,
      render: (order: PendingOrder) => (
        <Typography variant="subtitle2" color="text.secondary">
          #{order.patient_number}
        </Typography>
      ),
    },
    {
      columnIndex: 2,
      render: (order: PendingOrder) => <>{order.patient.full_name}</>,
    },
    {
      columnIndex: 3,
      render: (order: PendingOrder) => <>{order.patient.cedula}</>,
    },
  ];

  // const toolbarComponents = (
  //   <Box width={1}>
  //     <DateRangePickers setDateRange={() => {}} />
  //   </Box>
  // );

  return (
    <>
      <MuiDatatable
        data={orders?.data}
        columns={TABLE_COLUMNS}
        options={{
          checkbox: false,
          search: false,
          pagination: true,
          dense: false,
          collapse: true,
          toolbar: false,
          filterFields: ['patient_full_name', 'patient_cedula', 'patient_number'],
        }}
        sx={{
          inputStyle: { width: { sm: '100%', md: '50%' } },
        }}
        loading={orders.isLoading}
        customCell={customCell}
        renderChildRow={(row: PendingOrder) => (
          <ChildRow order={row} onClick={openCaptureResultsDialog} />
        )}
      />
      <MuiDialog />
    </>
  );
}

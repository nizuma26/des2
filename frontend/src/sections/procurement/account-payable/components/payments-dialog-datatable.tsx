//@mui
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useDialogStore } from '../../../../components/dialog';
import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../components/alert';

import { BaseModalProps } from '../../../../types';
import { AccountPayablePaymentList } from '../../../../types/procurements/account-payable';

import { paymentColumns } from '../context';

import { deletePayment } from '../../../../api/procurement/account-payable-payment';

import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import { MuiDatatable } from '../../../../components/datatable';
import { useGetData } from '../../../../hooks/use-get-data';
import CustomTooltip from '../../../../components/custom-tooltip/custom-tooltip';

//-------------------------------------------------------------------

interface PaymentsDialogDatatableProps extends BaseModalProps {
  indexAccount: number;
  accountPayableId: number;
  account: string;
}

export default function PaymentsDialogDatatable({
  indexAccount,
  accountPayableId,
  account,
  onClose = () => {},
}: PaymentsDialogDatatableProps) {
  const { data = [], isLoading } = useGetData({
    url: `api/procurement/account-payable/list-payments/?id=${accountPayableId}`,
    queryKey: ['payments', accountPayableId],
  });

  console.log(data);

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const { showAlert } = useAlert();

  const { submit, removeData, updateData } = useMutateData();

  const onDeletePayment = (id: number) => {
    showAlert({
      content: '¿Esta seguro de eliminar el pago?',
      fn: () =>
        submit({
          promise: deletePayment(id),
          onSuccess: (response) => {
            console.log(response)
            removeData(['payments', accountPayableId], id);
            updateData({
              queryKey: ['accounts-payable'],
              index: indexAccount,
              fields: ['balance', 'status'],
              values: [response.data.balance, response.data.status],
            });
          },
        }),
    });
  };

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (data: AccountPayablePaymentList, rowIndex: number) => <>${data.payment}</>,
    },
    {
      columnIndex: 3,
      render: (data: AccountPayablePaymentList, rowIndex: number) => (
        <>
          <CustomTooltip title="Eliminar pago" placement="left-start">
            <IconButton color="error" onClick={() => onDeletePayment(data.id)}>
              <Iconify icon="solar:trash-bin-minimalistic-bold" />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Ver detalle de pago" placement="left-start">
            <IconButton>
              <Iconify icon="ion:eye-sharp" />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="solar:chat-round-money-bold" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        Pagos de la cuenta <Typography>{account} </Typography>
        <CustomTooltip title="Los pagos ya no se podran eliminar despues de la fecha límite">
          <Iconify icon="fa6-solid:circle-info" sx={{ color: 'text.secondary' }} />
        </CustomTooltip>
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <Box width={1}>
          <MuiDatatable
            data={data}
            columns={paymentColumns}
            loading={isLoading}
            options={{
              filterFields: ['payment', 'payment_date', 'payment_ref'],
              checkbox: false,
              dense: false,
            }}
            sx={{
              inputStyle: { width: '100%' },
              table: { size: 'small' },
              tableHead: { bgcolor: 'background.paper' },
            }}
            customCell={customCell}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

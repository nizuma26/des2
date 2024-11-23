//@Mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import {
  ApprovalActions,
  ApprovalRequisitionValues,
} from '../../../../../types/procurements/approvals';

import { useForm, FormProvider } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useDialogStore, MuiDialog } from '../../../../../components/dialog';

import { PurchaseRequisition } from '../../../../../types/procurements/purchase-requisition';

import { QUERY_KEYS } from '../../../purchase-requisition/context';

import { approvePurchaseRequisition } from '../../../../../api/procurement/approvals';

import Iconify from '../../../../../components/iconify';
import ApprovalActionButton from './approval-action-button';
import RequisitionApprovalDetailTable from './requisition-approval-detail-table';
import ApprovalDialog from './approval-dialog';
import { useAlert } from '../../../../../components/alert';

interface RequisitionApprovalDetailProps {
  defaultValues: ApprovalRequisitionValues;
  requisitionData: PurchaseRequisition;
}

export default function RequisitionApprovalInfo({
  defaultValues,
  requisitionData,
}: RequisitionApprovalDetailProps) {
  const form = useForm({
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const mutate = useMutateData();
  const showAlert = useAlert((state) => state.showAlert);

  const generate = () => {
    showAlert({
      title: 'Generar Orden de Compra',
      content: `¿Desea generar la orden de compra de esta requisición?`,
      fn: () => router.push(`/purchase-requisition/generate/${requisitionData.id}`),
    });
  };

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const showDialog = useDialogStore((state) => state.showDialog);

  const mutation = useMutation({
    mutationFn: approvePurchaseRequisition,
  });

  const returnToList = () => router.replace('/approval-requisitions');

  const onSubmit = (data: ApprovalRequisitionValues) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        if (response.data.action === "Aprobado") generate();
        else returnToList();
        mutate.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        closeDialog();
      },
    });
  };

  const setChangeStatus = (status: ApprovalActions, icon: string) => {
    form.setValue('action', status);
    const title =
      status === 'Aprobado' ? 'Aprobar' : status === 'Rechazado' ? 'Rechazar' : 'Devolver';
    showDialog(<ApprovalDialog title={title} icon={icon} loading={mutation.isPending} />);
  };

  const styleResponsive = {
    mb: 4,
    columnGap: 3,
    rowGap: 4,
    display: 'grid',
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12} lg={12}>
        <Card sx={{ overflow: 'visible' }}>
          <CardHeader
            className="scrollbar"
            avatar={
              <Button
                color="primary"
                onClick={returnToList}
                startIcon={<Iconify icon="fe:arrow-left" />}
              >
                Volver
              </Button>
            }
            action={
              <Stack width={1} direction="row" spacing={1} mt="3px">
                <ApprovalActionButton
                  onClick={() => setChangeStatus('Aprobado', 'solar:check-read-linear')}
                  loading={mutation.isPending}
                  title="Aprobar"
                  icon="solar:check-read-linear"
                />
                <ApprovalActionButton
                  onClick={() => setChangeStatus('Rechazado', 'solar:dislike-bold-duotone')}
                  loading={mutation.isPending}
                  title="Rechazar"
                  icon="solar:dislike-bold-duotone"
                />
                <ApprovalActionButton
                  onClick={() => setChangeStatus('Devuelto', 'streamline:return-2-solid')}
                  loading={mutation.isPending}
                  title="Devolver"
                  icon="streamline:return-2-solid"
                />
              </Stack>
            }            
            sx={{
              overflow: 'auto',
              alignItems: 'center',
              verticalAlign: 'middle',
              boxShadow: 'rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset',
              background: 'none',
              color: 'inherit',
              pl: 2,
              mt: 'inherit',
              mr: 'inherit',
              ml: 'inherit',
            }}
          />
          <FormProvider {...form}>
            <form
              id="approval-form"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Box py={4} px={3}>
                <Stack
                  sx={{
                    ...styleResponsive,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                  }}
                >
                  <Stack typography="subtitle2" gap={1}>
                    <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                      Solicitante:
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        alt={requisitionData?.requester?.names}
                        src={BASE_URL + requisitionData?.requester?.image}
                      />
                      <ListItemText>
                        <Typography variant="subtitle2">
                          {requisitionData?.requester?.names}{' '}
                          {requisitionData?.requester?.last_names}
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          {requisitionData?.requester?.cedula}
                        </Typography>
                      </ListItemText>
                    </Stack>
                  </Stack>
                  <Stack typography="subtitle2" gap={1}>
                    <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                      Laboratorio:
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        alt={requisitionData?.requester?.names}
                        src={BASE_URL + requisitionData?.laboratory?.logo}
                      />
                      <ListItemText>
                        <Typography variant="subtitle2">
                          {requisitionData?.laboratory?.name}
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          {requisitionData?.laboratory?.code}
                        </Typography>
                      </ListItemText>
                    </Stack>
                  </Stack>
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      typography="subtitle2"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                        Fecha de creación:
                      </Box>
                      <Box>{requisitionData?.created_at}</Box>
                    </Stack>
                    <Stack
                      direction="row"
                      typography="subtitle2"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                        Fecha de emisión:
                      </Box>
                      <Box>
                        {requisitionData?.request_date} {requisitionData?.request_hour}
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      typography="subtitle2"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                        Esperado para:
                      </Box>
                      <Box>{requisitionData?.required_date}</Box>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack typography="subtitle2" gap={1}>
                  <Box maxWidth={1} color="text.secondary" alignItems="flex-start">
                    Comentario:
                  </Box>
                  <Box
                    component="p"
                    maxWidth={1}
                    color="text.secondary"
                    alignItems="flex-start"
                    bgcolor="background.neutral"
                    borderRadius={1}
                    p={2}
                  >
                    {requisitionData?.comment}
                  </Box>
                </Stack>
              </Box>
              <RequisitionApprovalDetailTable />
              <MuiDialog />
            </form>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
}

//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

import { bgGradient2 } from '../../../../../theme/css';

import { useForm, FormProvider } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { useDialogStore } from '../../../../../components/dialog';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { CaptureResultsDialogProps } from './types';
import { ResultForm } from '../../../../../types/orders/result';

import { newResult, editResult } from '../../../../../api/orders/results';
import { QUERY_KEYS } from '../../context';

import { fYear } from '../../../../../utils/format-time';

import { SvgIcon } from '../../../../../components/svg-color';
import ItemInfo from './item-info';
import ResultValues from './result-values';

//-------------------------------------------------------------------

export default function CaptureResultsDialog({
  orderData,
  labTestData,
  defaultValues,
  onClose,
  onSubmit,
}: CaptureResultsDialogProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const {
    palette: { primary },
  } = useTheme();

  const form = useForm<ResultForm>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const isEdit = labTestData.status === 'En proceso';

  const handleClose = () => {
    closeDialog(), onClose && onClose();
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editResult : newResult,
  });

  const { submit, invalidateQueries } = useMutateData();

  const sendForm = (data: ResultForm) => {
    let newData = data;
    newData['status'] = 'Procesado';
    submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        closeDialog();
        invalidateQueries({ queryKey: [QUERY_KEYS.pendingOrders] });
        onSubmit && onSubmit(response.data);
      },
    });
  };

  const setStatus = (status: 'En proceso' | 'Procesado') => form.setValue('status', status);

  const age = fYear(orderData?.patient.birthdate);
  const gender = orderData?.patient.gender === 'M' ? 'Masculino' : 'Femenino';

  const title = isEdit ? 'Modificar Resultados' : 'Captura de Resultados';

  const bgGradientPrimary = bgGradient2({
    direction: '180deg',
    startColor: primary.main,
    endColor: primary.dark,
  });

  return (
    <>
      <AppBar
        sx={{
          position: 'relative',
          boxShadow: 'inherit',
          ...bgGradientPrimary,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon icon="ic_close" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}: "{labTestData?.lab_test}" / orden: {orderData?.code}
          </Typography>
          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            startIcon={<SvgIcon icon="ic_save" />}
            color="inherit"
            form="result-form"
            onClick={() => setStatus('Procesado')}
          >
            Guardar
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <FormProvider {...form}>
        <DialogContent dividers>
          <form
            id="result-form"
            onSubmit={form.handleSubmit(sendForm)}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2} px={1} mt={4}>
              <Box width={1} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={1}>
                <ItemInfo
                  label="Paciente"
                  value={`# ${orderData?.patient_number} / ${orderData?.patient?.full_name} / ${orderData.patient.cedula}`}
                  width="100%"
                />
                <ItemInfo label="Género" value={gender} width="100%" />
                <ItemInfo label="Edad" value={`${age[0]} ${age[1]}`} width="100%" />
              </Box>
              <Box px={1}>
                <OutlinedInput
                  type={defaultValues?.observation}
                  size="small"
                  fullWidth
                  placeholder="Obervación"
                  {...form.register('observation')}
                  error={!!form.formState.errors.observation}
                />
              </Box>
            </Stack>
            <Paper sx={{ mx: 1, mt: 4, pb: 2, bgcolor: 'background.neutral', overflow: 'hidden' }}>
              <Typography
                variant="subtitle1"
                sx={{ ...bgGradientPrimary, py: 1, px: 2, color: '#fff' }}
              >
                {labTestData?.lab_test}
              </Typography>
              <Stack width={1} mt={1} px={2}>
                <ResultValues />
              </Stack>
            </Paper>
          </form>
        </DialogContent>
      </FormProvider>
    </>
  );
}

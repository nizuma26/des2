//@Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { newBeginningInventory, editBeginningInventory } from '../../../../api/inventory/beginning-inventory';
import { useRouter } from '../../../../routes/hooks';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { statusOptions } from '../context';

import {
  BeginningInventoryFormData,
  BeginningInventoryFormProps,
} from '../../../../types/beginning-inventory';

import { SvgIcon } from '../../../../components/svg-color';
import { RouterLink } from '../../../../routes/components';
import ControlledSelect from '../../../../components/controlled/controlled-select';
import ControlledDatePicker from '../../../../components/controlled/controlled-datepicker';
import ItemTable from './detail-table';
import InvoiceSummary from './invoice-summary';
import ToastUtilities from '../../../../components/toast/toast-manager';

export default function BeginningInventoryForm({
  values,
  invalidateQuery,
}: BeginningInventoryFormProps) {
  const form = useForm<BeginningInventoryFormData>({
    defaultValues: values,
  });

  const isEdit = !!values?.id

  const mutation = useMutation({
    mutationFn: isEdit ? editBeginningInventory : newBeginningInventory
  });

  const router = useRouter();
  const mutate = useMutateData();

  const laboratoryOptions = values?.laboratory
  ? [{ value: values?.laboratory, label: values?.laboratory_name }]
  : [];

  const onSubmit = (data: BeginningInventoryFormData) => {
    if (!data.detail.length)
      return ToastUtilities.warning({ msg: 'Debe cargar al menos un artículo en el detalle' });
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        router.replace('/beginning-inventory');
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12} lg={12}>
        <Card sx={{ overflow: 'visible' }}>
          <FormProvider {...form}>
            <Box
              component="form"
              py={4}
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              noValidate
            >
              <Box
                sx={{
                  mb: 4,
                  columnGap: 3,
                  px: 3,
                  rowGap: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 3fr))',
                }}
              >
                <ControlledSelect
                  name="laboratory"
                  label="Laboratorio"
                  options={laboratoryOptions}
                  control={form.control}
                  defaultValue={values?.laboratory}
                />
                <ControlledSelect
                  name="status"
                  label="Estado"
                  options={statusOptions}
                  control={form.control}
                />
                <ControlledDatePicker name="last_date" label="Fecha" control={form.control} />
              </Box>
              <Box px={3}>
                <TextField
                  defaultValue={values && values.note}
                  fullWidth
                  label="Nota"
                  multiline
                  rows={2}
                  sx={{ mb: 3 }}
                  {...form.register('note', { required: 'Debe ingresar una nota o razón' })}
                  error={!!form.formState.errors.note}
                  helperText={form.formState.errors.note?.message}
                />
              </Box>
              <ItemTable />
              <InvoiceSummary />
              <Stack
                direction="row"
                display="flex"
                justifyContent="flex-end"
                gap={1}
                mt={5}
                px={3}
                sx={{
                  '@media (max-width: 547px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <LoadingButton
                  variant="contained"
                  color="inherit"
                  startIcon={<SvgIcon icon="ic_save" />}
                  loading={mutation.isPending}
                  sx={{ transition: '180ms all' }}
                  type="submit"
                >
                  Guardar
                </LoadingButton>
                <Button
                  href="/beginning-inventory"
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  startIcon={<SvgIcon icon="ic_back" />}
                >
                  Cancelar
                </Button>
              </Stack>
            </Box>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
}

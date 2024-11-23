import { useState, useEffect, useCallback } from 'react';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import FormLabel from '@mui/material/FormLabel';

import { useForm } from 'react-hook-form';

import { Dayjs } from 'dayjs';

import { OrderInvoiceFormValues } from '../../../../../types/orders/order-invoice';
import { DateRangeData } from '../../../../../components/date-picker/types';

import { TABLE_COLUMNS, QUERY_KEYS, DEFAULT_FORM_VALUES } from '../../context';

import { useGetData } from '../../../../../hooks/use-get-data';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import ControlledRadio from '../../../../../components/controlled/controlled-radio';
import DateRangePicker from '../../../../../components/date-picker/date-range-picker';
import InvoiceSummary from './invoice-summary';
import SearchClientDialog from './search-client-dialog';
import { SvgIcon } from '../../../../../components/svg-color';
import ToastUtilities from '../../../../../components/toast';

// ----------------------------------------------------------------------

interface FilterOrdersState {
  startDate: Dayjs | string;
  endDate: Dayjs | string;
  clientId: number | null;
  filterBy: 'Persona' | 'Empresa';
}

export default function BillableOrdersTable() {
  const [filters, setFilters] = useState<FilterOrdersState>({
    startDate: '',
    endDate: '',
    clientId: null,
    filterBy: 'Empresa',
  });

  const {
    data = [],
    isFetching,
    refetch,
  } = useGetData({
    url: `/api/orders/invoice/order-to-bill/?client_id=${filters.clientId}&filter_by=${filters.filterBy}&start_date=${filters.startDate}&end_date=${filters.endDate}`,
    queryKey: [
      QUERY_KEYS.pendingOrders,
      `${filters.clientId}-${filters.filterBy}-${filters.startDate}-${filters.endDate}`,
    ],
    enabled: false,
  });

  console.log(data);

  const form = useForm<OrderInvoiceFormValues>({
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
    },
  });

  useEffect(() => {
    if (!!filters.clientId === false) return;
    refetch();
  }, [filters]);

  const setDataFilter = useCallback((dateRange: DateRangeData) => {
    if (!!form.getValues('client_id') === false)
      return ToastUtilities.info({ msg: 'Debe seleccionar un cliente' });
    setFilters({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      clientId: form.getValues('client_id'),
      filterBy: form.getValues('on_behalf'),
    });
  }, []);

  // const customCell = [
  //   {
  //     columnIndex: 0,
  //     render: (order: PendingOrder, rowIndex: number, onCollapse: () => void) => (
  //       <IconButton onClick={onCollapse}>
  //         <Iconify icon="ep:arrow-down-bold" width={18} />
  //       </IconButton>
  //     ),
  //   },
  //   {
  //     columnIndex: 1,
  //     render: (order: PendingOrder) => (
  //       <Typography variant="subtitle2" color="text.secondary">
  //         #{order.patient_number}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     columnIndex: 2,
  //     render: (order: PendingOrder) => <>{order.patient.full_name}</>,
  //   },
  //   {
  //     columnIndex: 3,
  //     render: (order: PendingOrder) => <>{order.patient.cedula}</>,
  //   },
  // ];

  const onSubmit = (formData: OrderInvoiceFormValues) => {
    console.log(formData);
  };

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };

  const setClientData = (
    clientName: string,
    address: string,
    phoneNumber: string,
    clientId: number | null
  ) => {
    form.setValue('client_name', clientName);
    form.setValue('address', address);
    form.setValue('phone_number', phoneNumber);
    form.setValue('client_id', clientId);
  };

  const toolbarComponents = (
    <Stack width={1} direction={{ xs: 'column', md: 'row' }} alignItems="center">
      <DateRangePicker
        setDateRange={(dateRangeData: DateRangeData) => setDataFilter(dateRangeData)}
        sxProps={{ textField: styleInput, button: { height: 44 } }}
      />
    </Stack>
  );

  return (
    <Card>
      <CardHeader
        title="Ordenes por Facturar"
        sx={{
          color: '#fff',
          mb: 1,
        }}
        action={
          <LoadingButton
            type="submit"
            variant='outlined'
            sx={{ border: '2px solid rgba(209, 260, 250, 0.6)' }}
            loading={false}
            color="inherit"
            startIcon={<SvgIcon icon="ic_save" />}
            form="order-invoice-form"
          >
            Guardar Factura
          </LoadingButton>
        }
      />
      <Stack>
        <Grid container p={2} spacing={2}>
          <Grid xs={12} md={8} gap={2}>
            <form id="order-invoice-form" onSubmit={form.handleSubmit(onSubmit)}></form>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box
                width={1}
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems="center"
                gap={3}
              >
                <Box
                  width={1}
                  display="flex"
                  flexDirection={{ xs: 'column', md: 'row' }}
                  alignItems="center"
                  gap={3}
                >
                  <FormLabel id="controlled-radio-buttons-group" sx={{ fontWeight: '600', ml: 1 }}>
                    A nombre de:
                  </FormLabel>
                  <ControlledRadio
                    control={form.control}
                    name="on_behalf"
                    options={[
                      { value: 'Persona', label: 'Persona', labelPlacement: 'end' },
                      { value: 'Empresa', label: 'Empresa', labelPlacement: 'end' },
                    ]}
                    row
                  />
                  <SearchClientDialog setClientData={setClientData} getValues={form.getValues} />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nombre o Razon Social"
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontWeight: '600' },
                  }}
                  sx={{ ...styleInput, border: 'none' }}
                  {...form.register('client_name', { required: 'Campo requerido' })}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Domicilio"
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontWeight: '600' },
                  }}
                  sx={{ ...styleInput }}
                  {...form.register('address')}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Nombre o Razon Social"
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontWeight: '600' },
                  }}
                  sx={{ ...styleInput }}
                  {...form.register('phone_number')}
                />
              </Box>
              {toolbarComponents}
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <InvoiceSummary orders={data} setValue={form.setValue} />
          </Grid>
        </Grid>
        <MuiDatatable
          data={data}
          columns={TABLE_COLUMNS}
          options={{
            checkbox: false,
            search: false,
            pagination: true,
            dense: false,
            collapse: true,
            toolbar: false,
          }}
          sx={{
            inputStyle: { width: { sm: '100%', md: '50%' } },
          }}
          loading={isFetching}
        />
      </Stack>
    </Card>
  );
}

import { useState, ReactNode, SyntheticEvent } from 'react';
// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import { useForm, FormProvider } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { LabTestFormValues } from '../../../../../types/configuration/lab-test';
import { LabTestFormProps } from './types';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { editLabTest, newLabTest } from '../../../../../api/configuration/lab-tests';

import ToastUtilities from '../../../../../components/toast';
import Iconify from '../../../../../components/iconify';
import { MuiDialog } from '../../../../../components/dialog';
import GeneralDataSection from './general-data-section';
import PricesSection from './prices-section';
import ParametersSection from './parameters-section';
import ItemsSection from './items-section';

// ----------------------------------------------------------------------
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default function LabTestForm({ values, invalidateQuery }: LabTestFormProps) {
  const [value, setValue] = useState(0);

  const router = useRouter();

  const returnToListPage = () => router.replace('/lab-test');

  const form = useForm<LabTestFormValues>({
    defaultValues: values,
  });

  const mutate = useMutateData();

  const mutation = useMutation({
    mutationFn: !!values?.id ? editLabTest : newLabTest,
  });

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = (data: LabTestFormValues) => {
    if (!data?.parameters.length) {
      return ToastUtilities.warning({ msg: 'Debe agregar al menos un parametro en el examen' });
    }
    // else if (!!form.formState.errors)
    //   return ToastUtilities.error({
    //     msg: 'Error al enviar el formulario. Debe ingresar los datos correctos',
    //   });
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        returnToListPage();
        invalidateQuery();
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Card sx={{ overflow: 'hidden' }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ boxShadow: 'rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset', px: 2 }}
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Datos generales" {...a11yProps(0)} />
            <Tab label="Parametros" {...a11yProps(1)} />
            <Tab label="Asignar artículos" {...a11yProps(2)} />
            <Tab label="Precios" {...a11yProps(3)} />
          </Tabs>
          <FormProvider {...form}>
            <form id='labtest-form' onSubmit={form.handleSubmit(onSubmit)} noValidate autoComplete="off">
              <CardContent sx={{ px: 0 }}>
                <CustomTabPanel value={value} index={0}>
                  <GeneralDataSection values={values} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <ParametersSection />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <ItemsSection />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <PricesSection />
                </CustomTabPanel>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: 'flex-end',
                  boxShadow: 'rgba(145, 158, 171, 0.08) 0px -2px 0px 0px',
                  py: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                }}
              >
                <LoadingButton
                  loading={mutation.isPending}
                  sx={{ transition: '180ms all' }}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  type="submit"
                  form="labtest-form"
                >
                  Guardar
                </LoadingButton>
                <LoadingButton
                  loading={mutation.isPending}
                  sx={{ transition: '180ms all' }}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  type="submit"
                >
                  Guardar y crear otro
                </LoadingButton>
                <Button startIcon={<Iconify icon="fe:arrow-left" />} onClick={returnToListPage}>
                  Volver
                </Button>
              </CardActions>
            </form>
          </FormProvider>
        </Card>
      </Grid>
      <MuiDialog />
    </Grid>
  );
}

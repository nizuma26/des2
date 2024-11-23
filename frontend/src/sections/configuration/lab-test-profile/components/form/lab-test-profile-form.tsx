// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import { useForm, FormProvider } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { LabTestProfileFormValues } from '../../../../../types/configuration/lab-test-profile';
import { LabTestProfileFormProps } from './types';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import {
  newLabTestProfile,
  editLabTestProfile,
} from '../../../../../api/configuration/lab-test-profile';

import ToastUtilities from '../../../../../components/toast';
import { MuiDialog } from '../../../../../components/dialog';
import { SvgIcon } from '../../../../../components/svg-color';
import GeneralDataSection from './general-data-section';
import LabTestTable from './lab-test-table';

// ----------------------------------------------------------------------

export default function LabTestProfileForm({ values, invalidateQuery }: LabTestProfileFormProps) {
  const router = useRouter();

  const returnToListPage = () => router.replace('/lab-test/profile');

  const form = useForm<LabTestProfileFormValues>({
    defaultValues: values,
  });

  const mutate = useMutateData();

  const mutation = useMutation({
    mutationFn: !!values?.id ? editLabTestProfile : newLabTestProfile,
  });

  const onSubmit = (data: LabTestProfileFormValues) => {
    if (!data?.lab_tests.length) {
      return ToastUtilities.warning({ msg: 'Debe agregar al menos un examen en el perfil' });
    }
    console.log(data);
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        returnToListPage();
        invalidateQuery();
      },
    });
  };

  return (
    <Grid container spacing={7} mt={1}>
      <FormProvider {...form}>
        <Grid xs={12}>
          <Card>
            <CardHeader
              title="Datos generales"
              action={
                <Box display='flex' gap={2}>
                  <LoadingButton
                    type="submit"
                    sx={{ bgcolor: 'rgba(249, 250, 251, 0.2)' }}
                    loading={false}
                    color="inherit"
                    startIcon={<SvgIcon icon="ic_save" />}
                    form='profile-form'
                  >
                    Guardar
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    loading={false}
                    color="inherit"
                    startIcon={<SvgIcon icon="ic_save" />}
                    sx={{ bgcolor: 'rgba(249, 250, 251, 0.2)' }}
                    form='profile-form'
                  >
                    Guardar y crear otro
                  </LoadingButton>
                  <Button
                    color="inherit"
                    startIcon={<SvgIcon icon="ic_back" />}
                    onClick={returnToListPage}
                    sx={{ bgcolor: 'rgba(249, 250, 251, 0.2)' }}
                  >
                    Volver
                  </Button>
                </Box>
              }
            />
            <form id='profile-form' onSubmit={form.handleSubmit(onSubmit)} noValidate autoComplete="off">
              <CardContent sx={{ px: 0 }}>
                <GeneralDataSection values={values} />
              </CardContent>
            </form>
            <MuiDialog />
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <CardHeader title="Tabla de examenes" />
            <LabTestTable />
          </Card>
        </Grid>
      </FormProvider>
    </Grid>
  );
}

//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';

import { LabTestFormValues } from '../../../../../types/configuration/lab-test';

import { GeneralDataProps } from './types';

import { useDialogStore } from '../../../../../components/dialog';

import LabTestCategorySearch from '../../../../common/autocompletes/lab-test-category-search';
import SampleSearch from '../../../../common/autocompletes/sample-search';
import ContainerSearch from '../../../../common/autocompletes/container-search';
import ContainerFormDialog from '../../../containers/components/form/container-form-dialog';
import LabTestCategoryFormDialog from '../../../lab-test-categories/components/form/lab-test-category-form-dialog';
import SampleFormDialog from '../../../samples/components/form/sample-form-dialog';

//---------------------------------------------------

export default function GeneralDataSection({ values }: GeneralDataProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LabTestFormValues>();

  const showDialog = useDialogStore((state) => state.showDialog);

  return (
    <>
      <Stack spacing={3} p={3}>
        <Stack
          display="grid"
          gap={3}
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <TextField
            defaultValue={values.abbreviation}
            fullWidth
            label="Abreviatura"
            {...register('abbreviation', { required: 'Este campo es requerido' })}
            error={!!errors.abbreviation}
            helperText={errors?.abbreviation?.message}
          />
          <TextField
            defaultValue={values.name}
            fullWidth
            label="Nombre"
            {...register('name', { required: 'Este campo es requerido' })}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <LabTestCategorySearch
            control={control}
            name="category"
            onClickButton={() => showDialog(<LabTestCategoryFormDialog />)}
          />
        </Stack>
        <Stack
          display="grid"
          gap={3}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <ContainerSearch
            control={control}
            name="container"
            onClickButton={() => showDialog(<ContainerFormDialog />)}
          />
          <SampleSearch
            control={control}
            name="sample"
            onClickButton={() => showDialog(<SampleFormDialog />)}
          />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          <TextField
            defaultValue={values.description}
            fullWidth
            label="Descripción"
            multiline
            rows={3}
            {...register('description')}
          />
          <TextField
            defaultValue={values.indications}
            fullWidth
            label="Indicaciones"
            multiline
            rows={3}
            {...register('indications')}
          />
        </Box>
      </Stack>
    </>
  );
}

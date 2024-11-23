//@mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';

import { LabTestProfileFormValues } from '../../../../../types/configuration/lab-test-profile';

import { GeneralDataProps } from './types';

import { useDialogStore } from '../../../../../components/dialog';

import LabTestCategorySearch from '../../../../common/autocompletes/lab-test-category-search';
import LabTestCategoryFormDialog from '../../../lab-test-categories/components/form/lab-test-category-form-dialog';

//---------------------------------------------------

export default function GeneralDataSection({ values }: GeneralDataProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LabTestProfileFormValues>();

  const showDialog = useDialogStore((state) => state.showDialog);

  return (
    <>
      <Box display="grid" gap={3} p={3}>
        <Box
          display="grid"
          gap={3}
          gridTemplateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
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
        </Box>
        <Box
          display="grid"
          gap={3}
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
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
      </Box>
    </>
  );
}

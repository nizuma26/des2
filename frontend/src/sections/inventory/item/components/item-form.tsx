import { useState } from 'react';
//@Mui
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { newItem, editItem } from '../../../../api/inventory/item';

import { ItemFormValue } from '../../../../types/inventory/item';

import { useRouter } from '../../../../routes/hooks';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { MuiDialog, useDialogStore } from '../../../../components/dialog';
import Iconify from '../../../../components/iconify';
import Dropzone from '../../../../components/dropzone/dropzone';
import ControlledSwitch from '../../../../components/controlled/controlled-switch';
import CategoryAutocomplete from './category-autocomplete';
import MeasureUnitAutocomplete from '../../../common/autocompletes/measure-unit-autocomplete';
import ModelAutocomplete from './model-autocomplete';

interface ItemFormProps {
  values: ItemFormValue;
  invalidateQuery: () => void;
}

export default function ItemForm({ values, invalidateQuery }: ItemFormProps) {

  const [ createOther, setCreateOther ] = useState(false);

  const form = useForm<ItemFormValue>({
    defaultValues: values,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset
  } = form;

  const isEdit = !!values.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editItem : newItem,
  });

  const router = useRouter();
  const mutate = useMutateData();

  const closeDialog = useDialogStore(state => state.closeDialog)

  const returnToList = () => router.replace('/item')

  const handleChangeImage = (file: File | null) => {
    setValue('image', file);
  };

  const onSubmit = (data: ItemFormValue) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        if (createOther) return reset()
        returnToList()
      },
    });
    closeDialog();
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8} lg={8}>
        <Card sx={{ overflow: 'visible' }}>
          <Box
            component="form"
            py={4}
            px={3}
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            noValidate
          >
            <Box
              sx={{
                mb: 4,
                columnGap: 3,
                rowGap: 4,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 3fr))',
              }}
            >
              <TextField
                defaultValue={values?.name}
                fullWidth
                multiline
                label="Nombre"
                {...register('name', { required: 'El nombre es requerido' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <CategoryAutocomplete name='category' control={control} />
              <MeasureUnitAutocomplete name='measure_unit' control={control} />
              <ModelAutocomplete name='model' control={control} />
            </Box>
            <TextField
              defaultValue={values && values.description}
              fullWidth
              label="Descripción"
              multiline
              rows={3}
              sx={{ mb: 3 }}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              gap={1}
              mt={5}
              sx={{
                '@media (max-width: 547px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <LoadingButton
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                loading={mutation.isPending}
                sx={{ transition: '180ms all' }}
                type="submit"
                onClick={() => {createOther && setCreateOther(false)}}
              >
                Guardar
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                loading={mutation.isPending}
                type="submit"
                onClick={() => setCreateOther(true)}
              >
                Guardar y crear otro
              </LoadingButton>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={returnToList}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
      <Grid xs={12} md={4} lg={4}>
        <Card sx={{ p: 3 }}>
          <Dropzone onChange={handleChangeImage} defaultPreview={values?.image} />
          <FormGroup>
            <ControlledSwitch name="is_active" label="Activo" control={control} />
            <ControlledSwitch
              name="is_inventoriable"
              label="¿Es inventariable?"
              control={control}
            />
            <ControlledSwitch
              name="with_tax"
              label="¿Se cobra impuesto?"
              control={control}
            />
            <ControlledSwitch
              name="use_in_tests"
              label="¿Se usara en examenes?"
              control={control}
            />
          </FormGroup>
        </Card>
      </Grid>
      <MuiDialog />
    </Grid>
  );
}

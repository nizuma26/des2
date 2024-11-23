//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { AffiliationFormDialogProps } from '../types';
import { Affiliation } from '../../../../../types/orders/affiliations';

import { bgGradient2 } from '../../../../../theme/css';

import { useDialogStore } from '../../../../../components/dialog';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { editAffiliation, newAffiliation } from '../../../../../api/orders/affiliations';

import { CONCEPT_CHOICES, PRICE_TYPE, FORM_VALUES, QUERY_KEYS } from '../../context';

import { SvgIcon } from '../../../../../components/svg-color';
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import { CostType } from '../../../../../types/configuration/lab-test';

//--------------------------------------------------------

export default function AffiliationDialogForm({
  values = FORM_VALUES,
  onClose,
  onSubmit,
}: AffiliationFormDialogProps) {
  
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const {
    palette: { primary },
  } = useTheme();

  const isEdit = !!values.id;
  
  const priceType = isEdit
  ? PRICE_TYPE.find((price) => price.label === values.price_type)?.value as CostType
  : values.price_type;

  console.log('FORM: ', values)

  const defaultValue:Affiliation = {
    ...values,
    price_type: priceType,
  }
  
  const form = useForm<Affiliation>({
    defaultValues: defaultValue,
  });
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = form;
  
  const mutation = useMutation({
    mutationFn: isEdit ? editAffiliation : newAffiliation,
  });
  
  const mutate = useMutateData();

  const sendForm = (data: Affiliation) => {
    console.log(data);
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        handleClose();
        console.log(response, data.id);
        if (isEdit && data?.id !== undefined) {
          console.log('Edit');
          mutate.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.list], data: { ...response?.data } });
        }
        onSubmit && onSubmit(response?.data);
      },
    });
  };

  const icon = isEdit ? <SvgIcon icon="ic_edit" /> : <SvgIcon icon="ic_save" />;
  const title = isEdit ? 'Modificar Empresa' : 'Registrar Empresa';

  const boxStyle = {
    display: 'grid',
    gap: 2,
    gridTemplateColumns: { sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
  };

  const bgGradientPrimary = bgGradient2({
    direction: '135deg',
    startColor: primary.dark,
    endColor: primary.main,
  });

  return (
    <>
      <AppBar
        sx={{
          position: 'relative',
          boxShadow: 'inherit',
          color: '#fff',
          ...bgGradientPrimary,
        }}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon icon="ic_close" />
          </IconButton>
          <Typography ml={2} variant="subtitle1" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        id="company-form"
        autoComplete="off"
        className="scrollbar"
        onSubmit={handleSubmit(sendForm)}
      >
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              defaultValue={values.name}
              fullWidth
              label="Nombre"
              {...register('name', { required: 'Este campo es requerido' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Box sx={{ ...boxStyle }}>
              <TextField
                defaultValue={values.email}
                fullWidth
                label="Email"
                {...register('email', {
                  pattern: {
                    value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    message: 'El correo electrónico no es valido',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                defaultValue={values.phone_number}
                fullWidth
                label="Teléfono"
                {...register('phone_number')}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Box>
            <Box sx={{ ...boxStyle }}>
              <TextField
                defaultValue={values.rif}
                fullWidth
                label="Rif"
                {...register('rif', { required: 'Este campo es requerido' })}
                error={!!errors.rif}
                helperText={errors.rif?.message}
              />
              <TextField
                defaultValue={values.postal_code}
                fullWidth
                label="Código postal"
                {...register('postal_code')}
                error={!!errors.postal_code}
                helperText={errors.postal_code?.message}
              />
            </Box>
            <TextField
              defaultValue={values.contact_person}
              fullWidth
              label="Persona de contacto"
              {...register('contact_person')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Box sx={{ ...boxStyle }}>
              <TextField
                defaultValue={values.credit_days}
                fullWidth
                label="Días de crédito"
                {...register('credit_days', {
                  required: 'Este campo es requerido',
                  min: { value: 0, message: 'No se aceptan números enteros' },
                })}
                error={!!errors.credit_days}
                helperText={errors.credit_days?.message}
              />
              <TextField
                defaultValue={values.value}
                fullWidth
                label="Aplicar"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                {...register('value', {
                  required: 'Este campo es requerido',
                  min: { value: 0, message: 'No se aceptan números negativos' },
                  max: { value: 100, message: 'El límite es 100%' },
                })}
                error={!!errors.value}
                helperText={errors.value?.message}
              />
            </Box>
            <Box sx={{ ...boxStyle }}>
              <ControlledSelect
                control={control}
                name="concept"
                options={CONCEPT_CHOICES}
                label="Obtiene"
                defaultValue={values.concept}
              />
              <ControlledSelect
                control={control}
                name="price_type"
                options={PRICE_TYPE}
                label="Precio"
              />
            </Box>
            <TextField
              defaultValue={values.address}
              multiline
              fullWidth
              maxRows={2}
              label="Dirección"
              {...register('address')}
              error={!!errors.postal_code}
              helperText={errors.postal_code?.message}
            />
          </Stack>
        </DialogContent>
      </form>
      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center' }}>
        <LoadingButton
          fullWidth
          startIcon={icon}
          variant="contained"
          type="submit"
          loading={mutation.isPending}
          color='inherit'
          form="company-form"
        >
          Guardar Empresa
        </LoadingButton>
      </DialogActions>
    </>
  );
}

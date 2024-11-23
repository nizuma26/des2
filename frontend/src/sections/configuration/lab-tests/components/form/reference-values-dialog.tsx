//@mui
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useFieldArray, useForm } from 'react-hook-form';

import { ReferenceValuesDialogProps } from './types';
import { LabTestFormValues, ReferenceValue } from '../../../../../types/configuration/lab-test';

import { REFERENCE_VALUE_TABLE_COLUMNS } from '../../context';

import { useDialogStore } from '../../../../../components/dialog';

import {
  PlusIcon,
  DeleteIcon,
  CloseIcon,
  EditIcon,
} from '../../../../../components/iconify/default-icons';
import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import CustomTooltip from '../../../../../components/custom-tooltip';

//-------------------------------------------------------------------

export default function ReferenceValuesDialog({
  index,
  parameterName,
  control,
}: ReferenceValuesDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReferenceValue>();

  const { fields, append, update, remove } = useFieldArray<LabTestFormValues>({
    name: `parameters.${index}.reference_values`,
    control: control,
  });

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const onSubmit = (data: ReferenceValue) => {
    data?.id !== undefined 
    ? update(data.id, {...data})
    : append({ ...data });
    reset();
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (data: ReferenceValue, rowIndex: number) => (
        <>
          <CustomTooltip title="Remover" placement="left-end">
            <IconButton color="error" onClick={() => remove(rowIndex)}>
              <DeleteIcon />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Editar" placement="right-end">
            <IconButton
              color="primary"
              onClick={() => {
                setValue("name", data.name)
                setValue("normal_value", data.normal_value)
                setValue("id", rowIndex)
              }}
            >
              <EditIcon />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <DialogTitle
        display="flex"
        alignItems="center"
        gap={1}
        typography="subtitle2"
        id="alert-dialog-title"
      >
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <PlusIcon />
        </Label>
        {`Valores de referencia: "${parameterName}"`}
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Stack
              width={1}
              direction={{ sm: 'column', md: 'row' }}
              spacing={2}
              alignItems="center"
              p={2}
              bgcolor="rgba(105, 108, 122, 0.03)"
            >
              <Stack width={1} direction={{ sm: 'column', md: 'row' }} spacing={1}>
                <TextField
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  fullWidth
                  label="Nombre"
                  placeholder='Escriba un nombre'
                  {...register('name', {
                    required: 'Campo requerido',
                  })}
                  error={!!errors?.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  size="small"
                  margin="dense"
                  fullWidth
                  label="Valores normales"
                  {...register('normal_value', {
                    required: 'Campo requerido',
                  })}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors?.normal_value}
                  helperText={errors.normal_value?.message}
                />
                <CustomTooltip title="Agregar valor de referencia">
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    color="primary"
                    aria-label="add"
                    sx={{
                      maxWidth: 20,
                      maxHeight: 40,
                      color: '#fff',
                      borderRadius: '10px',
                      boxShadow: 'inherit',
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </CustomTooltip>
              </Stack>
            </Stack>
          </form>
          <MuiDatatable
            data={fields as ReferenceValue[]}
            columns={REFERENCE_VALUE_TABLE_COLUMNS}
            customCell={customCell}
            options={{
              checkbox: false,
              search: false,
              toolbar: false,
              pagination: false,
              dense: false,
            }}
            sx={{ table: { size: 'small' } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          justifyContent: 'center',
          borderTop: '2px solid rgba(145, 158, 171, 0.06)',
        }}
      >
        <Button onClick={closeDialog} startIcon={<CloseIcon />}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

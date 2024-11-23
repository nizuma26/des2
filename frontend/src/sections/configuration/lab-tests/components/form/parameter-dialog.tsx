import { useState } from 'react';
//@mui
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';

import { useForm } from 'react-hook-form';

import { Parameter, ParameterType } from '../../../../../types/configuration/lab-test';
import { ParameterDialogProps } from './types';

import { PARAM, TYPE_PARAMETER } from '../../context';

import { useDialogStore } from '../../../../../components/dialog';

import {
  PlusIcon,
  RoundIcon,
  CloseIcon,
  EditIcon,
} from '../../../../../components/iconify/default-icons';
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import Label from '../../../../../components/label';
import ParameterOptions from './parameter-options';

//-------------------------------------------------------------------

export default function ParameterDialog({
  defaultValue = PARAM,
  addOrUpdate,
  index,
}: ParameterDialogProps) {

  const [addOther, setAddOther] = useState(false);
  const [isSelectType, setIsSelectType] = useState<ParameterType>(defaultValue.parameter_type);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<Parameter>({
    defaultValues: defaultValue,
  });

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog();
  };

  const onSubmit = (data: Parameter) => {
    addOrUpdate(data, index);
    if (addOther) return reset();
    handleClose();
  };

  const title = index !== undefined ? 'Editar' : 'Agregar';
  const icon = index !== undefined ? <EditIcon /> : <PlusIcon />;
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
          {icon}
        </Label>
        {title} parametro
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <DialogContent className="scrollbar">
          <Stack width={1} spacing={3}>
            <TextField
              defaultValue={defaultValue?.name}
              {...register('name', { required: 'Debe asignar un nombre al parametro' })}
              label="Nombre"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              defaultValue={defaultValue?.measure_unit}
              {...register('measure_unit')}
              label="Unidad de medida"
              error={!!errors.measure_unit}
              helperText={errors.measure_unit?.message}
            />
            <ControlledSelect
              options={TYPE_PARAMETER}
              control={control}
              name="parameter_type"
              label="Tipo de parametro"
              defaultValue={defaultValue.parameter_type}
              onSelected={(value) => setIsSelectType(value as ParameterType)}
            />
            <Collapse in={isSelectType === 'select'} timeout="auto" unmountOnExit sx={{ width: 1 }}>
              <ParameterOptions control={control} index={index} />
            </Collapse>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '2px solid rgba(145, 158, 171, 0.06)' }}>
          <Button type="submit" startIcon={icon} onClick={() => setAddOther(false)}>
            {index !== undefined ? 'Guardar cambios' : 'Agregar'}
          </Button>
          {index === undefined && (
            <Button type="submit" startIcon={<RoundIcon />} onClick={() => setAddOther(true)}>
              Agregar otro
            </Button>
          )}
          <Button onClick={handleClose} startIcon={<CloseIcon />}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

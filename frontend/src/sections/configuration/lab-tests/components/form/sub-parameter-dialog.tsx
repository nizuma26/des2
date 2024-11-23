import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useFieldArray, useForm } from 'react-hook-form';

import { SubParameterDialogProps } from './types';
import {
  LabTestFormValues,
  ParameterType,
  SubParameter,
} from '../../../../../types/configuration/lab-test';

import { PARAM, PARAMETER_TABLE_COLUMNS, TYPE_PARAMETER } from '../../context';

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
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import Collapse from '@mui/material/Collapse';
import ParameterOptions from './parameter-options';

//-------------------------------------------------------------------

export default function SubParameterDialog({
  index,
  parameterName,
  control,
}: SubParameterDialogProps) {

  const [isSelectType, setIsSelectType] = useState<ParameterType>(PARAM.parameter_type);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control: SubControl,
    reset,
  } = useForm<SubParameter>();

  const { fields, append, update, remove } = useFieldArray<LabTestFormValues>({
    name: `parameters.${index}.sub_parameters`,
    control: control,
    rules: {
      required: "Debe ingresar al menos un sub-parametros"
    }
  });

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const onSubmit = (data: SubParameter) => {
    if (data?.id !== undefined) {
      update(data.id, { ...data })
      if (data.parameter_type === "composite") setValue("options", [])
    }
    else {
      append({ ...data })
      if (data.parameter_type === "composite") setValue("options", [])
    }
    reset();
  };

  const newTypeParam = TYPE_PARAMETER.filter(newType => newType.value !== 'composite');

  const customCell = [
    {
      columnIndex: 2,
      render: (data: SubParameter) => {
        if (data.parameter_type === 'number') return <Label color="blue">Numérico</Label>;
        else if (data.parameter_type === 'text') return <Label color="error">Texto</Label>;
        else if (data.parameter_type === 'select')
        return <Label color="success">Lista de opciones</Label>;
      },
    },
    {
      columnIndex: 3,
      render: (data: SubParameter, rowIndex: number) => (
        <Stack direction="row" gap={1}>
          <CustomTooltip title="Editar" placement="top">
            <IconButton
              color="primary"
              onClick={() => {
                setValue('name', data.name);
                setValue('measure_unit', data.measure_unit);
                setValue('parameter_type', data.parameter_type);
                setValue('options', data.options);
                setValue('id', rowIndex);
              }}
            >
              <EditIcon />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Remover" placement="top">
            <IconButton color="error" onClick={() => remove(rowIndex)}>
              <DeleteIcon />
            </IconButton>
          </CustomTooltip>
        </Stack>
      ),
    },
  ];

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };

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
        {`Sub-Parámetros: "${parameterName}"`}
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Stack
              width={1}
              direction={{ sm: 'column', md: 'row' }}
              alignItems="center"
              p={2}
              bgcolor="rgba(105, 108, 122, 0.03)"
            >
              <Stack width={1} direction={{ sm: 'column', md: 'row' }} spacing={2}>
                <TextField
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{...styleInput}}
                  fullWidth
                  label="Nombre"
                  placeholder='Escriba un nombre'
                  {...register('name', { required: 'Debe asignar un nombre al parametro' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{...styleInput}}
                  label="Unidad de medida"
                  placeholder='Ingrese una unidad de medida'
                  {...register('measure_unit')}
                  error={!!errors.measure_unit}
                  helperText={errors.measure_unit?.message}
                />
                <ControlledSelect
                  size="small"
                  options={newTypeParam}
                  control={SubControl}
                  name="parameter_type"
                  label="Tipo de parametro"
                  defaultValue={PARAM.parameter_type}
                  onSelected={(value) => setIsSelectType(value as ParameterType)}
                />
                <CustomTooltip title="Agregar">
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
          <Box px={2} pb={2}>
            <Collapse in={isSelectType === 'select'} timeout="auto" unmountOnExit sx={{ width: 1 }}>
              <ParameterOptions control={SubControl} index={index} />
            </Collapse>
          </Box>
          <MuiDatatable
            data={fields as SubParameter[]}
            columns={PARAMETER_TABLE_COLUMNS}
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

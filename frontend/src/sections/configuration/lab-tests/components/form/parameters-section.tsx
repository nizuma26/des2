//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { LabTestFormValues, Parameter } from '../../../../../types/configuration/lab-test';

import { PARAM, PARAMETER_TABLE_COLUMNS } from '../../context';

import { useDialogStore } from '../../../../../components/dialog';
import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Iconify from '../../../../../components/iconify';
import { PlusIcon, EditIcon, DeleteIcon } from '../../../../../components/iconify/default-icons';
import Label from '../../../../../components/label';
import ParameterDialog from './parameter-dialog';
import CustomTooltip from '../../../../../components/custom-tooltip';
import ReferenceValuesDialog from './reference-values-dialog';
import SubParameterDialog from './sub-parameter-dialog';

//-------------------------------------------------------------

export default function ParametersSection() {
  const {
    control,
  } = useFormContext<LabTestFormValues>();

  const { fields, append, update, remove } = useFieldArray<LabTestFormValues>({
    name: 'parameters',
    control: control,
    rules: {required: "Debe agregar al menos un parámetro en el examen"}
  });

  const showDialog = useDialogStore((state) => state.showDialog);

  const addOrUpdate = (data: Parameter, index?: number) => {
    index !== undefined ? update(index, { ...data }) : append({ ...data });
  };
  const openParameterDialog = (data?: Parameter, index?: number) => {
    const hasData = !!data ? data : PARAM;
    showDialog(
      <ParameterDialog defaultValue={hasData} addOrUpdate={addOrUpdate} index={index} />,
      'sm'
    );
  };
  const openSubParameterDialog = (index: number, parameterName: string) => {
    showDialog(
      <SubParameterDialog index={index} parameterName={parameterName} control={control} />,
      'md',
    );
  };

  const openReferenceValueDialog = (index: number, parameterName: string) => {
    showDialog(
      <ReferenceValuesDialog index={index} parameterName={parameterName} control={control} />,
      'md'
    );
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (data: Parameter) => (
        <Stack direction="row" gap={2} alignItems="center">
          <>{data.name}</>
        </Stack>
      ),
    },
    {
      columnIndex: 2,
      render: (data: Parameter) => {
        if (data.parameter_type === 'number') return <Label color="blue">Numérico</Label>;
        else if (data.parameter_type === 'text') return <Label color="error">Texto</Label>;
        else if (data.parameter_type === 'select')
          return <Label color="success">Lista de opciones</Label>;
        else return <Label color="secondary">Compuesto</Label>;
      },
    },
    {
      columnIndex: 3,
      render: (data: Parameter, rowIndex: number) => (
        <Stack direction="row" gap={1}>          
          <CustomTooltip title="Editar" placement="left-end">
            <IconButton color="primary" onClick={() => openParameterDialog(data, rowIndex)}>
              <EditIcon />
            </IconButton>
          </CustomTooltip>
          {data.parameter_type !== 'composite' && (
            <CustomTooltip title="Valores de referencia" placement="top">
              <IconButton
                color="primary"
                onClick={() => openReferenceValueDialog(rowIndex, data?.name)}
              >
                <PlusIcon />
              </IconButton>
            </CustomTooltip>
          )}
          {data.parameter_type === 'composite' && (
            <CustomTooltip title="Sub-Parametros" placement="top">
              <IconButton
                color="primary"
                onClick={() => openSubParameterDialog(rowIndex, data?.name)}
              >
                <Iconify icon="majesticons:checkbox-list-detail" />
              </IconButton>
            </CustomTooltip>
          )}
          <CustomTooltip title="Remover" placement="top">
            <IconButton color="primary" onClick={() => remove(rowIndex)}>
              <DeleteIcon />
            </IconButton>
          </CustomTooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack px={0} spacing={2}>
      <Stack direction="row" spacing={2} p={2} alignItems="center">
        <Typography>Agregar parámetro </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => openParameterDialog()}
          sx={{ minWidth: 40, minHeight: 40, borderRadius: '50%', color: '#fff' }}
        >
          <PlusIcon />
        </Button>
        <Label color="primary">agregados: {fields.length}</Label>
      </Stack>
      <MuiDatatable
        data={fields as Parameter[]}
        columns={PARAMETER_TABLE_COLUMNS}
        customCell={customCell}
        options={{
          search: false,
          pagination: false,
          dense: false,
          toolbar: false,
          checkbox: false,
        }}
      />
    </Stack>
  );
}

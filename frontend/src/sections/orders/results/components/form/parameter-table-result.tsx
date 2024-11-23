import React from 'react';
//@mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useFormContext, useFieldArray } from 'react-hook-form';

import { ResultForm, CaptureValues } from '../../../../../types/orders/result';
import { ReferenceValue } from '../../../../../types/configuration/lab-test';

import ControlledSelect from '../../../../../components/controlled/controlled-select';

export default function ParameterTableResult() {
  const {
    register,
    control,
  } = useFormContext<ResultForm>();

  const { fields } = useFieldArray<ResultForm>({
    name: 'result_values',
    control,
  });

  const createOptions = (options: string[]) => {
    const optionList = options?.map((option) => {
      return { value: option, label: option };
    });
    return optionList;
  };

  const generateReferenceValues = (options: ReferenceValue[]) => {
    const optionList = options?.map((option) => {
      return { value: option?.normal_value, label: `${option?.name}- ${option.normal_value}` };
    });
    return optionList ?? [];
  };

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };
  const sublistPoint = (
    <Box component="span" bgcolor="text.secondary" p="3px" borderRadius={1}></Box>
  );
  const listPoint = <Box component="span" bgcolor="primary.main" p="4px" borderRadius={1}></Box>;

  return (
    <Stack direction="row" width={1}>
      <TableContainer component={Paper} sx={{ width: '100%', maxHeight: 440 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'background.paper', width: 'auto' }}>
                <Typography variant="subtitle2">Parámetro</Typography>
              </TableCell>
              <TableCell sx={{ bgcolor: 'background.paper', width: 'auto' }}>
                <Typography variant="subtitle2">Resultado</Typography>
              </TableCell>
              <TableCell align='center' sx={{ bgcolor: 'background.paper', width: 'auto' }}>
                <Typography variant="subtitle2">Unidad de medida</Typography>
              </TableCell>
              <TableCell sx={{ bgcolor: 'background.paper', width: 'auto' }}>
                <Typography variant="subtitle2">Valores de referencia</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(fields as CaptureValues[])?.map((parameter, paramIndex) => {
              return (
                <React.Fragment key={parameter.id}>
                  <TableRow>
                    <TableCell>
                      <Typography
                        display="flex"
                        variant="overline"
                        fontSize={13}
                        width={1}
                        py={1}
                        alignItems="center"
                        gap={1}
                      >
                        {parameter.parameter_type === 'composite' && listPoint}
                        {parameter.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width="30%">
                      {(parameter?.parameter_type === 'text' && (
                        <OutlinedInput
                          type={parameter?.parameter_type}
                          size="small"
                          fullWidth
                          placeholder="Ingrese resultado..."
                          {...register(`result_values.${paramIndex}.result_value`, {
                            required: 'Campo requerido',
                          })}
                          sx={{ ...styleInput }}
                        />
                      )) ||
                        (parameter?.parameter_type === 'number' && (
                          <OutlinedInput
                            type={parameter?.parameter_type}
                            size="small"
                            fullWidth
                            placeholder="Ingrese resultado..."
                            {...register(`result_values.${paramIndex}.result_value`, {
                              required: 'Campo requerido',
                            })}
                            sx={{ ...styleInput }}
                          />
                        )) ||
                        (parameter?.parameter_type === 'select' && (
                          <ControlledSelect
                            size="small"
                            control={control}
                            options={createOptions(parameter?.options ?? [])}
                            name={`result_values.${paramIndex}.result_value`}
                            label="Opciones"
                          />
                        ))}
                    </TableCell>
                    <TableCell align="center">{parameter?.measure_unit}</TableCell>
                    <TableCell>
                      {parameter?.parameter_type !== 'composite' && (
                        <ControlledSelect
                          size="small"
                          control={control}
                          options={generateReferenceValues(parameter?.reference_values)}
                          name={`result_values.${paramIndex}.normal_value`}
                          isRequired={false}
                          label="Opciones"
                        />
                      )}
                    </TableCell>
                  </TableRow>

                  {parameter?.sub_parameters && parameter.sub_parameters.length > 0 && (
                    <>
                      <TableRow>
                        <TableCell colSpan={4} sx={{ px: 2, py: 1 }}>
                          {parameter.sub_parameters.map((sub, subIndex) => (
                            <Box key={sub.id} sx={{ my: 0 }}>
                              <Paper
                                sx={{ display: 'flex', flexDirection: 'column', py: 0, width: 1 }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: 1,
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography
                                    display="flex"
                                    variant="subtitle2"
                                    fontSize={13}
                                    width={1}
                                    px={1}
                                    py={1}
                                    alignItems="center"
                                    gap={1}
                                  >
                                    {sublistPoint}
                                    {sub.name}
                                  </Typography>
                                  <Box display="flex" justifyContent="center" width={1} py="6px">
                                    {(sub?.parameter_type === 'text' && (
                                      <OutlinedInput
                                        type={sub?.parameter_type}
                                        size="small"
                                        fullWidth
                                        placeholder="Ingrese resultado..."
                                        {...register(
                                          `result_values.${paramIndex}.sub_parameters.${subIndex}.result_value`,
                                          { required: 'Campo requerido' }
                                        )}
                                      />
                                    )) ||
                                      (sub?.parameter_type === 'number' && (
                                        <OutlinedInput
                                          type={sub?.parameter_type}
                                          size="small"
                                          fullWidth
                                          placeholder="Ingrese resultado..."
                                          {...register(
                                            `result_values.${paramIndex}.sub_parameters.${subIndex}.result_value`,
                                            { required: 'Campo requerido' }
                                          )}
                                        />
                                      )) ||
                                      (sub?.parameter_type === 'select' && (
                                        <ControlledSelect
                                          size="small"
                                          control={control}
                                          options={createOptions(sub?.options ?? [])}
                                          name={`result_values.${paramIndex}.sub_parameters.${subIndex}.result_value`}
                                          label="Opciones"
                                        />
                                      ))}
                                  </Box>
                                  <Box display="flex" width={1} justifyContent="center">
                                    <Typography variant="caption">
                                      {sub?.measure_unit || 'N/A'}
                                    </Typography>
                                  </Box>
                                  <ControlledSelect
                                    size="small"
                                    control={control}
                                    options={generateReferenceValues(sub?.reference_values)}
                                    name={`result_values.${paramIndex}.sub_parameters.${subIndex}.normal_value`}
                                    label="Valores de referencia"
                                    isRequired={false}
                                  />
                                </Box>
                              </Paper>
                            </Box>
                          ))}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

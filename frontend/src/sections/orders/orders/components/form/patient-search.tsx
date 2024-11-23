import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';

import { usePathname } from '../../../../../routes/hooks';

import { useQueryClient } from '@tanstack/react-query';

import { Patient, PatientFormValues } from '../../../../../types/orders/patients';
import { PatientSearchProps } from './types';

import { useSearch } from '../../../../../hooks/use-search';
import { usePatient } from './use-patient';

import { useDialogStore } from '../../../../../components/dialog';
import ToastUtilities from '../../../../../components/toast';
import { SvgIcon } from '../../../../../components/svg-color';
import CustomTooltip from '../../../../../components/custom-tooltip';
import CreatePatientDialog from './create-patient-dialog';
import { DEFAULT_FORM_VALUES, QUERY_KEYS } from '../../../patients/context';
import ControlledAutocomplete from '../../../../../components/controlled/controlled-autocomplete';
import { AutocompleteOptions } from '../../../../../types';
//------------------------------------------------------------------------------------

export default function PatientSearch({
  setPatientId,
  setPatientNumber,
  control,
}: PatientSearchProps) {
  const showDialog = useDialogStore((state) => state.showDialog);

  const { patient, setPatient } = usePatient();
  const {
    data = [] as Patient[],
    isLoading,
    hasError,
    autocomplete,
    setData,
  } = useSearch({
    method: 'GET',
    url: 'api/orders/order/search_by_cedula/',
    delay: 300,
    minLength: 7,
  });

  const options = !!data.length
    ? data.map((p:Patient) => {
        return { value: p.id, label: `${p.cedula} / ${p.names} ${p.last_names}` };
      })
    : [];

  if (hasError) ToastUtilities.error({ msg: 'Ha ocurrido un error al consultar los datos' });

  const onChange = (selected: AutocompleteOptions | null) => {
    const patientSelected =
      data?.find((opt:Patient) => {
        return opt.id === selected?.value;
      }) ?? null;
    setPatient(patientSelected);
    setPatientId(patientSelected?.id ?? null);
    setPatientNumber(patientSelected.patient_number)
  };

  const onInputChange = (value: string, reason: 'input' | 'reset' | 'clear') => {
    console.log(reason);
    if (reason === 'input') autocomplete({ value });
  };

  const pathname = usePathname();

  useEffect(() => {
    setPatient(null);
  }, [pathname]);

  const queryClient = useQueryClient();

  const openDialog = (action: 'add' | 'edit') => {
    const patientData:PatientFormValues = {
      id: patient?.id,
      names: patient?.names ?? '',
      last_names: patient?.last_names ?? '',
      birthdate: dayjs(patient?.birthdate),
      address: patient?.address ?? '',
      cedula: patient?.cedula ?? '',
      email: patient?.email ?? '',
      phone_number: patient?.phone_number ?? '',
      gender: patient?.gender ?? 'M',
      is_active: true,
      affiliations: patient?.affiliations ?? [],
    };
    const formValues = action === 'edit' && patient !== null ? patientData : DEFAULT_FORM_VALUES;
    showDialog(
      <CreatePatientDialog
        values={formValues}
        invalidateQuery={() => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] })}
        onSubmit={(data: Patient, action) => {
          setPatient({ ...data }),
          setPatientId(data?.id ?? null);
          setData([{...data}])
          action === "add" && setPatientNumber(0)
        }}
      />,
      'md'
    );
  };

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name="patient"
        options={options}
        label="Paciente"
        placeholder="Escribe la cedula del paciente..."
        isRequired={true}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSelected={onChange}
      />
      <CustomTooltip title="Busqueda avanzada">
        <Button
          variant='contained'
          color="inherit"
          size="small"
          aria-label="search"
          sx={{ borderRadius: '9px', boxShadow: 'inherit', py: '15px' }}
        >
          <SvgIcon icon="ic_search" />
        </Button>
      </CustomTooltip>
      <CustomTooltip title="Crear paciente">
        <Button
          variant='contained'
          size="small"
          color="inherit"
          aria-label="add"
          sx={{ borderRadius: '9px', boxShadow: 'inherit', py: '15px' }}
          onClick={() => openDialog('add')}
        >
          <SvgIcon icon="ic_add" />
        </Button>
      </CustomTooltip>
      <CustomTooltip title="Editar paciente">
        <Button
          variant='contained'
          size="small"
          color="inherit"
          aria-label="add"
          sx={{ borderRadius: '9px', boxShadow: 'inherit', py: '15px' }}
          onClick={() => {
            patient === null ? false : openDialog('edit');
          }}
        >
         <SvgIcon icon="ic_edit" />
        </Button>
      </CustomTooltip>
    </Box>
  );
}

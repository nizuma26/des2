import { Control } from 'react-hook-form';

import { Purchase } from '../../../types/procurements/purchase';

import { useGetData } from '../../../hooks/use-get-data';

import { LaboratoryOptions } from '../types';

import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';

interface LaboratoryAutocompletProps {
  control: Control<Purchase>
}

const LaboratoryAutocomplete = ({
  control,
}: LaboratoryAutocompletProps) => {
    
  const { data = [], isLoading } = useGetData({
    url: 'api/config/laboratory/active_laboratories/',
    queryKey: ['active_laboratories'],
    staleTime: 60
  });

  const options = data.map((i: LaboratoryOptions) => {
    return { value: i.id, label: `${i.code} / ${i.name}` };
  });

  return (
    <ControlledAutocomplete
      control={control}
      name="laboratory"
      options={options}
      label="Laboratorio"
      requiredMessage="Debe seleccionar un proveedor"
      isLoading={isLoading}
    />
  );
};

export default LaboratoryAutocomplete;

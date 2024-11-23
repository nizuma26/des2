import { AutocompleteOptions } from '../../../../../components/controlled/types';
import { PatientAffiliation } from '../../../../../types/orders/patients';
import { AffiliationSearchProps } from './types';

import ControlledAutocomplete from '../../../../../components/controlled/controlled-autocomplete';
import { usePatient } from './use-patient';

//------------------------------------------------------------------------------------

export default function AffiliationSearch({
  control,
  isRequired = false,
  onSelected,
}: AffiliationSearchProps) {
  const patient = usePatient((state) => state.patient);

  const options =
    patient?.affiliations.map((f: PatientAffiliation) => {
      return { value: f.id, label: `${f.name} / ${f.concept} ${f.value}%` };
    }) ?? [];

  const handleSelected = (selected: AutocompleteOptions | null) => {
    const affiliation =
      patient?.affiliations.find((option: PatientAffiliation) => option.id == selected?.value) ?? null;
    onSelected && onSelected(affiliation);
  };

  return (
    <ControlledAutocomplete
      control={control}
      name="affiliation"
      options={options}
      label="Empresas del paciente"
      isRequired={isRequired}
      onSelected={handleSelected}
    />
  );
}

import Box from '@mui/material/Box';

import { LabTestSearchProps } from './types';
import { LabTestData } from '../../common/dialogues/types';

import AsyncAutocomplete from '../../../components/async-autocomplete';
import LabTestDatatableDialog from '../../common/dialogues/lab-test-datatable-dialog';

export default function LabTestSearch({ labTestIds, labTestType, addLabTest }: LabTestSearchProps) {
  const append = (labTest: LabTestData) =>
    addLabTest({
      uuid: labTest.id,
      abbreviation: labTest.abbreviation,
      name: labTest.name,
      standard: labTest.standard,
      emergency: labTest.emergency,
      affiliated: labTest.affiliated,
      home_service: labTest.home_service,
      holiday: labTest.holiday,
      exempt: labTest.exempt
    });

  return (
    <Box width={1} display="flex" alignItems="center" gap={2}>
      <AsyncAutocomplete
        options={{
          method: 'POST',
          url: 'api/config/lab-test/search-lab-test/',
          body: { ids: labTestIds, type: labTestType },
          delay: 300,
          minLength: 3,
        }}
        getOptionLabel={(option: { id: number; name: string }) => `${option?.id} - ${option?.name}`}
        clearOptions
        clearOnSelect
        onChange={(data: LabTestData) => append(data)}
      />
      <LabTestDatatableDialog
        labTestIds={labTestIds}
        labTestType={labTestType}
        addLabTest={append}
      />
    </Box>
  );
}

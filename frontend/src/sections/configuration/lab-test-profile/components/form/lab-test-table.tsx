import Stack from '@mui/material/Stack';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { CustomCell, RowSelectedOptions } from '../../../../../components/datatable/types';
import { LabTest, LabTestProfileFormValues } from '../../../../../types/configuration/lab-test-profile';

import { LAB_TEST_TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import LabTestSearch from '../../../../common/autocompletes/lab-test-search';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Label from '../../../../../components/label/label';
import { onlyNumbers } from '../../../../../utils/type-guard';

// ---------------------------------------------------------------------------------

function LabTestList() {
  const { control } = useFormContext<LabTestProfileFormValues>();

  const { fields, append, remove } = useFieldArray<LabTestProfileFormValues>({
    name: 'lab_tests',
    control,
  });

  const removeLabTest = (selected: number[]) => {
    //Se obtienen los índices de los examenes cuyos ids coincidan a los examenes seleccionados
    let indexes = fields.reduce((acc: number[], labTest, index) => {
      if (selected.includes(labTest.uuid)) {
        acc.push(index);
      }
      return acc;
    }, [])

    remove(indexes)
  };

  const getIds = fields.map(labTest => labTest.uuid)

  const customCell:CustomCell<LabTest>[] = [
    {
      columnIndex: 0,
      render: (labTestData) => {
        const name = labTestData.name.slice(0, 2);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
              {name}
            </Avatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13}>
                {labTestData.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {labTestData.abbreviation}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 1,
      render: (labTestData) => {
        const color = labTestData.standard > 0 ? 'secondary' : 'error';
        return (
          <Label color={color}>{labTestData.standard}</Label>
        );
      },
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Remover selecciinados',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de remover los examenes seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        removeLabTest(arrayNumbers);
        selectAll(false);
      },
    },
  ];

  const toolbarComponents = (
    <>
      <LabTestSearch labTestIds={getIds} labTestType='simple' addLabTest={append} />
    </>
  );

  return (
    <Stack>
      <MuiDatatable
        data={fields}
        columns={LAB_TEST_TABLE_COLUMNS}
        customCell={customCell}
        options={{ search: false, selectField: 'uuid', dense: false }}
        toolbarComponents={toolbarComponents}
        rowsSelectedOptions={rowSelectedOptions}
        sx={{table: {scrollX: 700}}}
      />
    </Stack>
  );
}

export default LabTestList;

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { LabTestList } from '../../../../../types/configuration/lab-test';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PopupOptions from './popup-options';
import { useGetData } from '../../../../../hooks/use-get-data';
import { CustomCell } from '../../../../../components/datatable/types';

// ----------------------------------------------------------------------

export default function LabTestProfileTable() {
  
  const { data = [], isLoading } = useGetData({
    url: '/api/config/lab-test/?type=perfil',
    queryKey: [QUERY_KEYS.list],
  });

  const customCell:CustomCell<LabTestList>[] = [
    {
      columnIndex: 0,
      render: (data) => (
        <Label color="info">{data.abbreviation}</Label>
      ),
    },
    {
      columnIndex: 3,
      render: (data) => (
        <PopupOptions id={data.id} name={`${data.abbreviation}-${data.name}`} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{ filterFields: ['abbreviation', 'name', 'category'], checkbox: false }}
        customCell={customCell}
      />
    </>
  );
}

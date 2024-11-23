import { Affiliation } from '../../../../../types/orders/affiliations';

import { TABLE_COLUMNS, QUERY_KEYS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';
import { useGetData } from '../../../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function AffiliationTable() {
  const { data, isLoading } = useGetData({
    url: '/api/orders/affiliation/',
    queryKey: [QUERY_KEYS.list],
  });

  const customCell = [
    {
      columnIndex: 3,
      render: (data: Affiliation) => {
        return (
          data.concept === 'Descuento' && <Label color="cyan">{data.concept}</Label> ||
          data.concept === 'Incremento' && <Label color="success">{data.concept}</Label> ||
          <Label color="warning">{data.concept}</Label>
        )
      },
    },
    {
      columnIndex: 5,
      render: (data: Affiliation) => <PopupOptions data={data} />,
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{ filterFields: ['name', 'concept', 'value'] }}
        customCell={customCell}
      />
    </>
  );
}

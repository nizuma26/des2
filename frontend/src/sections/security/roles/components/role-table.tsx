import { useGetData } from '../../../../hooks/use-get-data';

import { Role } from '../../../../types/security/role';

import { headLabel } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function RoleTable() {

  const { data=[], isLoading } = useGetData({
    url: '/api/users/role/',
    queryKey: ['roles'],
  });

  const customCell = [
    {
      columnIndex: 1,
      render: (data: Role, rowIndex: number) =>
          <Label color="info">{data.permissions}</Label>
    },
    {
      columnIndex: 2,
      render: (data: Role, rowIndex: number) =>
          <PopupOptions id={Number(data.id)} name={data.name} />
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['name', 'permissions']}}
        customCell={customCell}
      />
    </>
  );
}

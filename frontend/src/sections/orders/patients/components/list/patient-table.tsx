import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { PatientList } from '../../../../../types/orders/patients';

import { TABLE_COLUMNS, QUERY_KEYS } from '../../context';

import { useGetData } from '../../../../../hooks/use-get-data';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';
import { fYear } from '../../../../../utils/format-time';

// ----------------------------------------------------------------------

export default function PatientTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/orders/patient/',
    queryKey: [QUERY_KEYS.list],
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PatientList) => {
        const patientName = data?.full_name?.slice(0, 1);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
              {patientName}
            </Avatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13} noWrap>
                {data.full_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {data.cedula}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 3,
      render: (data: PatientList) => {
        const age = fYear(data.birthdate);
        return (
          <Stack>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13}>
                {data.birthdate}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <Label color="primary">
                  {age[0]} {age[1]}
                </Label>
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 4,
      render: (data: PatientList) =>
        data.gender === 'M' ? (
          <Label color="blue">Maculino</Label>
        ) : (
          <Label color="cyan">Femenino</Label>
        ),
    },
    {
      columnIndex: 5,
      render: (data: PatientList) => (
        <PopupOptions id={data.id} patient={`${data.cedula}/${data.full_name}`} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{ filterFields: ['full_name', 'cedula', 'phone_number'] }}
        customCell={customCell}
      />
    </>
  );
}

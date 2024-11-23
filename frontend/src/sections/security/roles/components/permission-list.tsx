import { startTransition, useMemo, useState } from 'react';
//@mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { useGetData } from '../../../../hooks/use-get-data';

import { Permission } from '../../../../types/security/role';

import LoadingScreen from '../../../../components/loader/loading-screen';
import PermissionListItem from './permission-list-item';
import Iconify from '../../../../components/iconify';
import NoData from '../../../../components/no-data';
import PermissionSelected from './permission-selected';

interface PermissionList {
  handleToggle: (id: number) => void;
  selectAll: (ids: number[]) => void;
  selected: number[];
}

export default function PermissionList({ handleToggle, selectAll, selected }: PermissionList) {

  const [filterPerm, setFilterPerm] = useState('');
  const [filterValue, setFilterValue] = useState('​');

  const { data = [], isLoading } = useGetData({
    url: 'api/users/role/permission_list/',
    queryKey: ['permissions'],
    staleTime: 30,
  });

  const checkedAll = (checked: boolean) => {
    const ids = data.map((perm: Permission) => perm.id);
    checked ? selectAll(ids) : selectAll([]);
  };

  const renderTitle = (
    <Box display="flex" gap={2}>
      Permisos
      {selected.length > 0 && (
        <PermissionSelected selected={selected.length} />
      )}
    </Box>
  );

  const permissionItems = useMemo(
    () => {
      return filterPerm ? data
        .filter((perm: Permission) =>
          perm.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((perm: Permission) => (
          <li key={`section-${perm.id}`}>
            <ul style={{ paddingLeft: 2 }}>
              <PermissionListItem
                id={perm.id}
                name={perm.name}
                selected={selected}
                handleToggle={handleToggle}
              />
            </ul>
          </li>
        )) : data.map((perm: Permission) => (
          <li key={`section-${perm.id}`}>
            <ul style={{ paddingLeft: 2 }}>
              <PermissionListItem
                id={perm.id}
                name={perm.name}
                selected={selected}
                handleToggle={handleToggle}
              />
            </ul>
          </li>
        ))},
    [filterValue, selected, data]
  )

  const notFound = !permissionItems.length;

  console.log(permissionItems)

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: 0,
        borderRadius: '16px',
        backgroundColor: 'rgba(145, 158, 171, 0.05)',
        border: '1px dashed rgba(145, 158, 171, 0.2)',
        px: 1,
        mt: 6,
      }}
    >
      <CardHeader
        action={
          <FormControlLabel
            value="start"
            control={<Checkbox onChange={(event) => checkedAll(event?.target?.checked)} />}
            label="Seleccionar todo"
            labelPlacement="start"
            sx={{ ml: 0 }}
          />
        }
        title={renderTitle}
        sx={{
          background: 'none',
          boxShadow: 'none',
          color: 'inherit',
          flexWrap: 'wrap',
          mt: 1,
          mr: 'inherit',
          ml: 'inherit',
        }}
      />
      <CardContent>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              borderRadius: '16px',
              border: '1px solid rgba(145, 158, 171, 0.2)',
            }}
          >
            <OutlinedInput
              placeholder="Filtrar permisos..."
              fullWidth
              value={filterPerm}
              onChange={(e) => {
                setFilterPerm(e.target.value),
                  startTransition(() => setFilterValue(e.target.value));
              }}
              sx={{
                typography: 'subtitle2',
                fontWeight: 'fontWeightMedium',
                border: 0,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
            />
            <List
              className="scrollbar"
              sx={{
                width: 1,
                maxHeight: 410,
                overflow: 'auto',
                minWidth: 260,
                pt: 0,
              }}
              subheader={<li />}
            >
              {notFound && <NoData query={filterPerm} />}
              {permissionItems}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

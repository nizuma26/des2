//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useQuery } from '@tanstack/react-query';

import { ItemInventory } from '../../../../types/inventory/item';
import { ItemDatatableDialogProps } from './types';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { getStockItems } from '../../../../api/inventory/item';

import { TABLE_COLUMNS } from './context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';

//-------------------------------------------------------------------

export default function ItemDatatableDialog({
  itemIds,
  onSelected,
  onClose,
}: ItemDatatableDialogProps) {

  const { data = [], isLoading } = useQuery({
    queryKey: ['stock-items'],
    queryFn: () => getStockItems(itemIds),
  });

  const { removeData } = useMutateData();
  
  const handleClickRow = (row: ItemInventory) => {
    removeData(['stock-items'], row.id);
    onSelected(row);
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const customCell = [
    {
      columnIndex: 0,
      render: (itemData: ItemInventory) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={itemData.name}
              variant="rounded"
              src={BASE_URL+itemData?.image}
              sx={{bgcolor: "primary.main"}}
            />
            <ListItemText>
              <Typography variant="subtitle2">{itemData.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {itemData.code}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 3,
      render: (itemData: ItemInventory) => {
        return (
          <>{itemData.price?.toFixed(2)}</>
        );
      },
    },
  ];

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="solar:box-bold-duotone" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        Cátalogo de Artículos
      </DialogTitle>
      <DialogContent sx={{ px: 0 }} className="scrollbar">
        <Box width={1}>
          <MuiDatatable
            data={data}
            columns={TABLE_COLUMNS}
            loading={isLoading}
            options={{ dense: false, pagination: false, checkbox: false }}
            customCell={customCell}
            sx={{
              inputStyle: { width: '100%' },
              table: { size: 'small', scrollY: 370 },
              tableHead: { bgcolor: 'background.paper' },
            }}
            onSelectedRow={handleClickRow}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

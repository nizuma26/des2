import { ReactNode, useState } from 'react';
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

import { useDialogStore } from '../../../../components/dialog';

import { getStockItems } from '../../../../api/inventory/item';

import { headLabel } from './context';

import { BaseModalProps } from '../../../../types';
import { StockItem } from '../../../../types/inventory/item';

import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import { MuiDatatable } from '../../../../components/datatable';

//-------------------------------------------------------------------

interface ItemModalProps extends BaseModalProps {
  laboratoryId: number | null;
  itemIds: number[];
  formDialog: (item: StockItem, clearSelectedItem: () => void) => ReactNode;
}

export default function ItemModal({
  laboratoryId,
  itemIds,
  formDialog,
  onClose = () => {},
}: ItemModalProps) {
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const { data = [], isLoading } = useQuery({
    queryKey: ['stock-items', laboratoryId],
    queryFn: () => getStockItems(laboratoryId, itemIds),
    enabled: !!laboratoryId,
  });

  const handleClose = () => {
    closeDialog(), onClose && onClose();
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const clearSelectedItem = () => setSelectedItem(null);

  if (selectedItem) return formDialog(selectedItem, clearSelectedItem);

  const customCell = [
    {
      columnIndex: 0,
      render: (itemData: StockItem, rowIndex: number) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={itemData.item_code}
              variant="rounded"
              src={BASE_URL + itemData?.item_image}
            />
            <ListItemText>
              <Typography variant="subtitle2">{itemData.item_name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {itemData.item_code}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="icon-park-outline:plus" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        Cátalogo de Artículos
      </DialogTitle>
      <DialogContent sx={{ px: 0 }} className="scrollbar">
        <Box width={1}>
          <MuiDatatable
            data={data}
            columns={headLabel}
            loading={isLoading}
            options={{ dense: false, pagination: false, checkbox: false }}
            customCell={customCell}
            sx={{
              inputStyle: { width: '100%' },
              table: { size: 'small' },
              tableHead: { bgcolor: 'background.paper' },
            }}
            onSelectedRow={(data) => setSelectedItem(data)}
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

import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import { useQuery } from '@tanstack/react-query';

import { BaseModalProps } from '../../../../../types';
import { LabTestItems, ItemsDatatableDialog } from '../../../../../types/configuration/lab-test';

import { searchItems } from '../../../../../api/configuration/lab-tests';

import { ITEMS_TABLE_COLUMNS_DIALOG } from '../../context';

import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';
import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

//-------------------------------------------------------------------

interface ItemDatatableDialogProps extends BaseModalProps {
  itemIds: number[];
  addItem: (item: LabTestItems) => void;
}

export default function ItemDatatableDialog({
  itemIds,
  addItem,
  onClose = () => {},
}: ItemDatatableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ['lab-test-items'],
    queryFn: () => searchItems(itemIds),
    enabled: isOpen
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  
  const { removeData } = useMutateData();
  
  const handleClickRow = (row: ItemsDatatableDialog) => {
    removeData(['lab-test-items'], row.id)
    addItem({
      item_id: row.id,
      item_name: row.item_name,
      item_code: row.item_code,
      quantity: 1,
      reduction_type: "orden"
    });
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (itemData: ItemsDatatableDialog, rowIndex: number) => {
        const itemName = itemData.item_name.slice(0, 2);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
              {itemName}
            </Avatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13}>
                {itemData.item_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {itemData.item_code}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 2,
      render: (itemData: ItemsDatatableDialog, rowIndex: number) => {
        return itemData.stock < 1 ? (
          <Label color="error">{itemData.stock}</Label>
        ) : (
          <Label color="secondary">{itemData.stock}</Label>
        );
      },
    },
  ];

  return (
    <>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ color: '#fff' }}
      >
        <Iconify icon="ion:search" />
      </Fab>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
      >
        <DialogTitle
          display="flex"
          alignItems="center"
          gap={1}
          typography="subtitle2"
          id="alert-dialog-title"
        >
          <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
            <Iconify icon="solar:box-bold-duotone" width={22} sx={{ opacity: 0.86 }} />
          </Label>
          Cátalogo de artículos
        </DialogTitle>
        <DialogContent sx={{ px: 0, py: 0 }} className="scrollbar">
          <Box width={1}>
            <MuiDatatable
              data={data}
              columns={ITEMS_TABLE_COLUMNS_DIALOG}
              loading={isLoading}
              options={{
                dense: false,
                pagination: false,
                checkbox: false,
                filterFields: ['item_name', 'item_category', 'stock', 'prices'],
              }}
              customCell={customCell}
              sx={{
                inputStyle: { width: '100%' },
                table: { size: 'small', scrollY: 400 },
                tableHead: { bgcolor: 'background.paper' },
              }}
              onSelectedRow={handleClickRow}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '2px solid rgba(145, 158, 171, 0.06)' }}>
          <Button onClick={handleClose} startIcon={<Iconify icon="fe:arrow-left" />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

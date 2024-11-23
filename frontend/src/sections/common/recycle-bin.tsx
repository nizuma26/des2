//@mui
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Columns } from '../../types/ui';
import { CustomCell } from '../../components/datatable/types';

import { useDialogStore } from '../../components/dialog';
import { useGetData } from '../../hooks/use-get-data';

import { BaseModalProps } from '../../types';

import Iconify from '../../components/iconify';
import Label from '../../components/label';
import { MuiDatatable } from '../../components/datatable';

//-------------------------------------------------------------------

interface RecycleBinProps<T extends Record<string, any>> extends BaseModalProps {
  titleDialog?: string;
  fetchOptions: {
    url: string;
    queryKey: Array<string>;
    mutateFn?: () => Promise<unknown> | void;
  };
  customCell?: Array<CustomCell<T>>;
}

export default function RecycleBin<T extends Record<string, any>>({
  titleDialog='Registros en papelera',
  fetchOptions,
  onClose,
  customCell,
}: RecycleBinProps<T>) {
  const columns: Columns[] = [
    { id: 'name', label: 'Registro', width: '80%', sort: false },
    { id: 'date', label: 'Fecha', width: '20%', sort: false },
  ];

  const closeDialog = useDialogStore((state) => state.closeDialog);

  //const { submit, removeData } = useMutateData();

  const { data = [], isLoading } = useGetData({
    url: fetchOptions.url,
    queryKey: fetchOptions.queryKey,
    enabled: !!fetchOptions.url,
  });

  const handleClose = () => {
    closeDialog(), onClose && onClose();
  };

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="solar:trash-bin-minimalistic-bold" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {titleDialog}
      </DialogTitle>
      <DialogContent sx={{ px: 0 }} className="scrollbar">
        <Box width={1}>
          <MuiDatatable
            data={data}
            columns={columns}
            loading={isLoading}
            options={{ dense: false, pagination: false, checkbox: false }}
            customCell={customCell}
            sx={{
              inputStyle: { width: '100%' },
              table: { size: 'small' },
              tableHead: { bgcolor: 'background.paper' },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Vaciar papelera
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

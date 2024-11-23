import { useMemo, useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { bgGradient2 } from '../../../../../theme/css';

import { Columns } from '../../../../../types/ui';
import { SearchClientDialogProps } from './types';

import { useGetData } from '../../../../../hooks/use-get-data';

import { QUERY_KEYS } from '../../context';

import { SvgIcon } from '../../../../../components/svg-color';
import MuiDatatable from '../../../../../components/datatable/mui-datatable';

//-------------------------------------------------------------------

interface ClientList {
  id: number;
  client_name: string;
  ci_or_rif: string;
  phone_number: string;
  address: string;
}

export default function SearchClientDialog({
  setClientData,
  getValues,
  onClose,
}: SearchClientDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filterBy = useMemo(() => getValues('on_behalf'), [isOpen, getValues]);

  const {
    palette: { primary },
  } = useTheme();

  const { data = [], isFetching } = useGetData({
    url: `api/orders/invoice/search-client/?filter-by=${filterBy}`,
    queryKey: [QUERY_KEYS.searchClient],
    enabled: isOpen,
    staleTime: 0
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const onSelectedRow = (row: ClientList) => {
    setClientData(row.client_name, row.address, row.phone_number, row.id);
    handleClose();
  };

  const name = filterBy === 'Persona' ? 'Nombre' : 'Razon Social';
  const title = filterBy === 'Persona' ? 'Buscar Paciente' : 'Buscar Empresa';

  const clientColumns: Array<Columns> = [
    { id: 'ci_or_rif', label: 'RIF', width: '20%' },
    { id: 'client_name', label: name, width: 'auto' },
  ];

  const bgGradientPrimary = bgGradient2({
    direction: '135deg',
    startColor: primary.dark,
    endColor: primary.main,
  });

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<SvgIcon icon="ic_search" />}
        sx={{ width: {xs: '100%', md: '40%'}, height: 45 }}
        onClick={handleOpen}
      >
        Buscar y seleccionar...
      </Button>
      {isOpen && (
        <Dialog
        fullWidth
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          maxWidth="md"
        >
          <AppBar
            sx={{
              position: 'relative',
              boxShadow: 'inherit',
              color: '#fff',
              ...bgGradientPrimary,
            }}
          >
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <SvgIcon icon="ic_close" />
              </IconButton>
              <Typography ml={2} variant="subtitle1" component="div">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent sx={{ px: 0, overflowY: 'hidden' }}>
            <Box width={1}>
              <MuiDatatable
                data={data}
                columns={clientColumns}
                loading={isFetching}
                options={{
                  dense: false,
                  checkbox: false,
                  filterFields: ['ci_or_rif', 'name_or_company_name'],
                }}
                sx={{
                  inputStyle: { width: '100%' },
                  tableHead: { bgcolor: 'background.paper' },
                  table: { scrollX: 600 },
                }}
                onSelectedRow={onSelectedRow}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

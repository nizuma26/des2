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

import { Columns } from '../../../types/ui';
import { searchLabtTest } from '../../../api/configuration/lab-tests';
import { LabTestDatatableDialogProps, LabTestData } from './types';

import { useMutateData } from '../../../hooks/use-mutate-data';

import { SvgIcon } from '../../../components/svg-color';
import Label from '../../../components/label';
import MuiDatatable from '../../../components/datatable/mui-datatable';

//-------------------------------------------------------------------

export default function LabTestDatatableDialog({
  labTestIds,
  labTestType,
  addLabTest,
  onClose = () => {},
}: LabTestDatatableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ['lab-tests-dialog'],
    queryFn: () => searchLabtTest(labTestIds, labTestType),
    enabled: isOpen,
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const { removeData } = useMutateData();

  const handleClickRow = (row: LabTestData) => {
    removeData(['lab-tests-dialog'], row.id);
    addLabTest(row);
  };

  const LAB_TEST_TABLE: Array<Columns> = [
    { id: 'abbreviation', label: 'Abreviatura' },
    { id: 'name', label: 'Examen' },
    { id: 'standard', label: 'Precio' },
  ]

  const customCell = [
    {
      columnIndex: 0,
      render: (labTestData: LabTestData, rowIndex: number) => {
        const name = labTestData.name.slice(0, 2);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
              {name}
            </Avatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13}>
                {labTestData.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {labTestData.abbreviation}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Fab
        variant='circular'
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ color: '#fff', borderRadius: '10px', boxShadow: 'inherit', p: 3 }}
      >
        <SvgIcon icon="ic_search" />
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
            <SvgIcon icon='ic_list' />
          </Label>
          Cátalogo de examenes
        </DialogTitle>
        <DialogContent sx={{ px: 0, overflowY: 'hidden' }}>
          <Box width={1}>
            <MuiDatatable
              data={data}
              columns={LAB_TEST_TABLE}
              loading={isLoading}
              options={{
                dense: false,
                pagination: false,
                checkbox: false,
                filterFields: ['abbreviation', 'name', 'standard'],
              }}
              customCell={customCell}
              sx={{
                inputStyle: { width: '100%' },
                table: { size: 'small', scrollY: 447 },
                tableHead: { bgcolor: 'background.paper' },
              }}
              onSelectedRow={handleClickRow}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '2px solid rgba(145, 158, 171, 0.06)' }}>
          <Button onClick={handleClose} startIcon={<SvgIcon icon='ic_close' />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

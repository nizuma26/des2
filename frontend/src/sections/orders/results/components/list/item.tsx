import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import {pdf } from '@react-pdf/renderer';

import { ItemProps } from './types';
import { Result } from '../../../../../types/orders/result';

import { useGetData } from '../../../../../hooks/use-get-data';

import { QUERY_KEYS } from '../../context';

import CustomTooltip from '../../../../../components/custom-tooltip';
import Label from '../../../../../components/label';
import { SvgIcon } from '../../../../../components/svg-color';
import ResultPdf from '../document-pdf/one-result/result-pdf';

// ------------------------------------------------------------------

function Item({ orderId, labTest, onClick }: ItemProps) {

  const [canRefetch, setCanRefetch] = useState(false);

  const { data, isFetching, isSuccess } = useGetData({
    url: `/api/orders/result/get-results/?order_id=${orderId}&lab_test_id=${labTest.lab_test_id}`,
    queryKey: [QUERY_KEYS.pendingOrders, labTest.id],
    enabled: canRefetch,
    staleTime: 30,
    gcTime: 1 * 60 * 1000
  });

  const openPdfInNewTab = (pdfData: Result) => {

    // Renderizar el documento en un blob
    const pdfBlob = pdf(<ResultPdf data={pdfData} />).toBlob();

    pdfBlob.then((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank'); // Abrir en una nueva pestaña
    });
  };

  useEffect(() => {
    if (isSuccess && canRefetch) {
      openPdfInNewTab(data[0]);
      setCanRefetch(false);
    }
  }, [isSuccess, data, canRefetch]);

  return (
    <>
      <Box
        key={labTest.id}
        sx={{
          display: 'flex',
          width: 1,
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(145, 158, 171, 0.05)',
          },
        }}
        onClick={onClick}
      >
        <Typography
          display="flex"
          variant="subtitle2"
          width={1}
          px={2}
          py={1}
          alignItems="center"
          gap={1}
        >
          <Label color="primary">
            <SvgIcon icon="ic_test_tube" width={18} />
          </Label>
          {labTest.lab_test}
        </Typography>
        {labTest.status === 'Procesado' && (
          <CustomTooltip title="Imprimir" placement="top">
            <IconButton
              color="default"
              sx={{ mr: 1 }}
              onClick={() => setCanRefetch(true)}
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress size={20} /> : <SvgIcon icon="ic_printer" />}
            </IconButton>
          </CustomTooltip>
        )}
        {(labTest.status === 'Por procesar' && (
          <Label color="warning" sx={{ mr: 2, px: 2 }}>
            {labTest.status}
          </Label>
        )) ||
          (labTest.status === 'En proceso' && (
            <Label color="cyan" sx={{ mr: 2, px: 2 }}>
              {labTest.status}
            </Label>
          )) || (
            <Label color="success" sx={{ mr: 2, px: 2 }}>
              {labTest.status}
            </Label>
          )}
      </Box>
    </>
  );
}

export default Item;

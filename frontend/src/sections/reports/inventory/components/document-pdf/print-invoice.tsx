import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { BlobProvider } from '@react-pdf/renderer';

import { Inventory } from '../../../../../types/reports/inventory';
import { LaboratoryDataForReporting } from '../../../../../types/configuration/laboratory';

import InventoryPDF from './inventory-pdf';
import { SvgIcon } from '../../../../../components/svg-color';

interface PrintInventoryProps {
  inventory: Inventory[];
  laboratory: LaboratoryDataForReporting
}

const PrintInventoryPDF = ({ inventory, laboratory }: PrintInventoryProps) => {
  return (
    <BlobProvider document={<InventoryPDF inventory={inventory} laboratory={laboratory} />}>
      {({ url, blob }) => (
        <a href={url} target="_blank">
          <Button
            fullWidth
            variant="contained"
            startIcon={<SvgIcon icon="ic_printer" />}
            color='inherit'
            sx={{ py: '14px' }}
          >
            <Typography variant="subtitle2" noWrap>
              Imprimir PDF
            </Typography>
          </Button>
        </a>
      )}
    </BlobProvider>
  );
};

export default PrintInventoryPDF;

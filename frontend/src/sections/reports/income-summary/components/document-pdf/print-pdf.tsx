import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { BlobProvider } from '@react-pdf/renderer';

import { IncomeSummary } from '../../../../../types/reports/income-summary';
import { LaboratoryDataForReporting } from '../../../../../types/configuration/laboratory';

import InventoryPDF from './inventory-pdf';
import { SvgIcon } from '../../../../../components/svg-color';

interface PrintInventoryProps {
  data: IncomeSummary[];
  laboratory: LaboratoryDataForReporting
  amountPaid?: number;
}

const PrintPDF = ({ data, laboratory, amountPaid }: PrintInventoryProps) => {
  return (
    <BlobProvider document={<InventoryPDF data={data} laboratory={laboratory} amountPaid={amountPaid} />}>
      {({ url, blob }) => (
        <a href={url ?? '#'} target="_blank">
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

export default PrintPDF;

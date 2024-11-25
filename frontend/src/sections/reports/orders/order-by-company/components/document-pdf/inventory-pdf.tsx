import { Page, Document, View, Image } from '@react-pdf/renderer';
import Title from './title';
import TableHead from './table-head';
import TableBody from './table-body';

import { styles } from './styles';

import { IncomeSummary } from '../../../../../../types/reports/income-summary';
import { LaboratoryDataForReporting } from '../../../../../../types/configuration/laboratory';

interface InvoicePdfProps {
  data: IncomeSummary[];
  laboratory: LaboratoryDataForReporting;
  amountPaid?: number;
}

const InventoryPDF = ({ data, laboratory, amountPaid }: InvoicePdfProps) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ maxWidth: 220, maxHeight: '10%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Image style={styles.logo} src={BASE_URL + laboratory?.get_logo} />
        </View>
        <Title labName={laboratory?.name} />
        <TableHead />
        <TableBody data={data} amountPaid={amountPaid} />
      </Page>
    </Document>
  );
};

export default InventoryPDF;

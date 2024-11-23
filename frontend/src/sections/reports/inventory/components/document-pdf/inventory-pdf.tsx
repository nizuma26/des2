import { Page, Document, View, Image } from '@react-pdf/renderer';
import Title from './title';
import TableHead from './table-head';
import TableBody from './table-body';

import { styles } from './styles';

import { Inventory } from '../../../../../types/reports/inventory';
import { LaboratoryDataForReporting } from '../../../../../types/configuration/laboratory';

interface InvoicePdfProps {
  inventory: Inventory[];
  laboratory: LaboratoryDataForReporting;
}

const InventoryPDF = ({ inventory, laboratory }: InvoicePdfProps) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ maxWidth: 220, maxHeight: '10%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Image style={styles.logo} src={BASE_URL + laboratory?.get_logo} />
        </View>
        <Title labName={laboratory?.name} />
        <TableHead />
        <TableBody inventory={inventory} />
      </Page>
    </Document>
  );
};

export default InventoryPDF;

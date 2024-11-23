import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

interface InvoiceTitleProps {
  labName: string;
  address: string;
  rif: string;
}

const InvoiceTitle = ({ labName, address, rif }: InvoiceTitleProps) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{labName}</Text>
    <Text style={styles.labInfo}>{address}</Text>
    <Text style={styles.labInfo}>{rif}</Text>
  </View>
);

export default InvoiceTitle;

import { Text, View, Image } from '@react-pdf/renderer';

import { styles } from './styles';

interface InvoiceTitleProps {
  labLogo: string;
  labName: string;
  address: string;
  rif: string;
}

const InvoiceTitle = ({ labLogo, labName, address, rif }: InvoiceTitleProps) => (
  <View style={[styles.titleRow]}>
    <View style={[styles.titleRow, { width: '35%', height: '70%'}]}>
      <Image style={styles.logo} src={labLogo} />
    </View>
    <View style={[styles.titleContainer, { width: '65%'}]}>
      <Text style={styles.reportTitle}>{labName}</Text>
      <Text style={styles.labInfo}>RIF:{rif}</Text>
      <Text style={styles.labInfo}>{address}</Text>
    </View>
  </View>
);

export default InvoiceTitle;

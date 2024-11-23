import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

interface InvoiceTitleProps {
  labName: string;
}

const Title = ({ labName }: InvoiceTitleProps) => (
  <View style={[styles.titleContainer]}>
      <Text style={styles.reportTitle}>{labName}</Text>
  </View>
);

export default Title;

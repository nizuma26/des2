import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

interface InvoiceSummaryProps {
  taxName?: string;
  tax?: number;
  discount: number;
  total: number;
  secondaryTotal: number;
  mainCurrencyCode: string;
  secondaryCurrencyCode: string;
}

const InvoiceSummary = ({ taxName, tax, discount, total, mainCurrencyCode, secondaryTotal, secondaryCurrencyCode }: InvoiceSummaryProps) => (
  <View style={styles.invoiceSummary}>
    <View style={styles.invoiceSummaryContent}>
      <View style={styles.invoiceSummaryItem}>
        <View style={styles.labInfo}>
          <Text>Subtotal</Text>
        </View>
        <View style={styles.labInfo}>
          <Text>{total}</Text>
        </View>
      </View>
      <View style={styles.invoiceSummaryItem}>
        <View style={styles.labInfo}>
          <Text>{taxName ?? 'IVA'}</Text>
        </View>
        <View style={styles.labInfo}>
          <Text>{tax ?? 0}%</Text>
        </View>
      </View>
      <View style={styles.invoiceSummaryItem}>
        <View style={styles.labInfo}>
          <Text>Descuento {`(${mainCurrencyCode})`}</Text>
        </View>
        <View style={styles.labInfo}>
          <Text>{discount}</Text>
        </View>
      </View>
      <View style={styles.invoiceSummaryItem}>
        <View style={styles.labInfo}>
          <Text>Total {`(${mainCurrencyCode})`}</Text>
        </View>
        <View style={styles.labInfo}>
          <Text>{total}</Text>
        </View>
      </View>
      <View style={styles.invoiceSummaryItem}>
        <View style={styles.labInfo}>
          <Text>Total en Divisa {`(${secondaryCurrencyCode})`}</Text>
        </View>
        <View style={styles.labInfo}>
          <Text>{secondaryTotal}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default InvoiceSummary;

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60,
  },
});

interface InvoiceNumberProps {
  invoice: {
    invoice_no: string;
    trans_date: string;
  };
}

const InvoiceNumber = ({ invoice }: InvoiceNumberProps) => (
  <>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{invoice.trans_date}</Text>
    </View>
  </>
);

export default InvoiceNumber;

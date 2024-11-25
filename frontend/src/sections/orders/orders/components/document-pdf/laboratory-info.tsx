import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { PaymentType } from '../../../../../types/orders/payments';

interface LaboratoryInfoProps {
  invoiceNumber: string;
  invoiceDate: string;
  nameOrTradeName: string;
  ciOrRif: string;
  paymentCondition: PaymentType;
}

const LaboratoryInfo = ({
  invoiceNumber,
  invoiceDate,
  nameOrTradeName,
  ciOrRif,
  paymentCondition
}: LaboratoryInfoProps) => (
  <View style={styles.titleContainer}>
    <Text style={styles.invoiceNumber}>Factura: {invoiceNumber} </Text>
    <Text style={styles.invoiceNumber}>Fecha de emisión: {invoiceDate} </Text>
    <Text style={styles.invoiceNumber}>Nombre o Razón Social: {nameOrTradeName} </Text>
    <Text style={styles.invoiceNumber}>Cédula/Rif: {ciOrRif} </Text>
  </View>
);

export default LaboratoryInfo;

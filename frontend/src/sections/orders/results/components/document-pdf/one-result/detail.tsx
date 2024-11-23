import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { Order } from '../../../../../../types/orders/orders';
import { fYear } from '../../../../../../utils/format-time';

interface DetailProps {
  orderCode: string;
  patient: Order['patient'];
  orderDate: string;
}

const Detail = ({ orderCode, orderDate, patient }: DetailProps) => {

  const age = fYear(patient.birthdate);
  const gender = patient.gender === 'M' ? 'Masculino' : 'Femenino';

  return (
    <View style={[styles.detailContainer, styles.gapTitle]}>
      <View style={[styles.titleRow, styles.gapTitle]}>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Nº Orden: </Text>
          <Text style={styles.text}>{orderCode}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Fecha de atención: </Text>
          <Text style={styles.text}>{orderDate}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Paciente: </Text>
          <Text style={styles.text}>{patient.full_name}</Text>
        </View>
      </View>
      <View style={[styles.titleRow, styles.gapTitle]}>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Télefono: </Text>
          <Text style={styles.text}>{patient?.phone_number}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Edad: </Text>
          <Text style={styles.text}>{age[0]} {age[1]}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Sexo: </Text>
          <Text style={styles.text}>{gender}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.label}>Cédula: </Text>
          <Text style={styles.text}>{patient.cedula}</Text>
        </View>
      </View>
    </View>
  );
};

export default Detail;

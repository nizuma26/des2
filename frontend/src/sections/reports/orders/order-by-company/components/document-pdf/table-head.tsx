import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

const TableHead = () => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={styles.theader}>
      <Text>Nº de orden</Text>
    </View>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Paciente</Text>
    </View>
    <View style={styles.theader}>
      <Text>Nº Factura</Text>
    </View>
    <View style={styles.theader}>
      <Text>Total</Text>
    </View>
    <View style={styles.theader}>
      <Text>Saldo</Text>
    </View>
      <View style={styles.theader}>
        <Text>Abonado</Text>
      </View>
  </View>
);

export default TableHead;

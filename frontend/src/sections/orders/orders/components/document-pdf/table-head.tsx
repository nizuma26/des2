import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';


const TableHead = () => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Examen</Text>
    </View>
    <View style={styles.theader}>
      <Text>Precio</Text>
    </View>
    <View style={styles.theader}>
      <Text>Descuento</Text>
    </View>
    <View style={styles.theader}>
      <Text>Total</Text>
    </View>
  </View>
);

export default TableHead;

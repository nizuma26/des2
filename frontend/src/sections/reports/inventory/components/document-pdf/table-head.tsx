import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';


const TableHead = () => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Artículo</Text>
    </View>
    <View style={styles.theader}>
      <Text>Categoría</Text>
    </View>
    <View style={styles.theader}>
      <Text>Stock actual</Text>
    </View>
    <View style={styles.theader}>
      <Text>Reservados</Text>
    </View>
    <View style={styles.theader}>
      <Text>Disponibles</Text>
    </View>
    <View style={styles.theader}>
      <Text>Stock mínimo</Text>
    </View>
    <View style={styles.theader}>
      <Text>Stock máximo</Text>
    </View>
  </View>
);

export default TableHead;

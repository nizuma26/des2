import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

const TableHead = () => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 3 }}>
    <View style={[styles.theader, styles.pl7, styles.theader2]}>
      <Text>PÁRAMETRO</Text>
    </View>
    <View style={styles.theader}>
      <Text>RESULTADO</Text>
    </View>
    <View style={styles.theader}>
      <Text>UNIDADES</Text>
    </View>
    <View style={styles.theader}>
      <Text>VALORES DE NORMALES</Text>
    </View>
  </View>
);

export default TableHead;

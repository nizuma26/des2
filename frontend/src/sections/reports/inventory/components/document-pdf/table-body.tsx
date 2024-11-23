import { Fragment } from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { Inventory } from '../../../../../types/reports/inventory';

interface TableBodyProps {
  inventory: Inventory[];
}

const TableBody = ({ inventory }: TableBodyProps) => {

  const rows = inventory.map((lt) => (
    <Fragment>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{lt.name}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.category} </Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.stock}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.reserved}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.available}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.min_stock}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.available}</Text>
        </View>
      </View>
    </Fragment>
  ));

  return <>{rows}</>;
};

export default TableBody;

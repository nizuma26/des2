import { Fragment } from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { OrderDetail } from '../../../../../types/orders/orders';

interface TableBodyProps {
  labTests: OrderDetail[];
}

const TableBody = ({ labTests }: TableBodyProps) => {

  const calculateTotal = (price:number, discount:number) => {
    const priceWithDisocunt = price * (discount / 100)
    const total = price - priceWithDisocunt
    return total.toFixed(2)
  }

  const rows = labTests.map((lt) => (
    <Fragment key={lt.id}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{lt.name}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.price} </Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.discount}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{calculateTotal(lt.price, lt.discount)}</Text>
        </View>
      </View>
    </Fragment>
  ));

  return <>{rows}</>;
};

export default TableBody;

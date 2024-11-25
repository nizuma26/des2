import { Fragment } from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { IncomeSummary } from '../../../../../../types/reports/income-summary';

interface TableBodyProps {
  data: IncomeSummary[];
  amountPaid?: number;
}

const TableBody = ({ data, amountPaid=0 }: TableBodyProps) => {
  const rows = data.map((lt) => (
    <Fragment key={lt.id}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={styles.tbody}>
          <Text>{lt.order_code} </Text>
        </View>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{lt.patient}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.invoice_number}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.total}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.total - lt.amount_paid}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{lt.amount_paid}</Text>
        </View>
      </View>
    </Fragment>
  ));

  return (
    <>
      {rows}
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text></Text>
        </View>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
        <View style={styles.tbody}>
          <Text>{amountPaid}</Text>
        </View>
      </View>
    </>
  );
};

export default TableBody;

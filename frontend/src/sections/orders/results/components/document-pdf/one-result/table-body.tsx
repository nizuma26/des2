import { Fragment } from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

import { ResultValues } from '../../../../../../types/orders/result';

interface TableBodyProps {
  results: ResultValues[];
}

const TableBody = ({ results }: TableBodyProps) => {
  const rows = results.map((lt) => (
    <Fragment key={lt.id}>
      {lt.parameter_type !== 'composite' ? (
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={[styles.tbody, styles.pl7, styles.tbody2]}>
            <Text>{lt.parameter}</Text>
          </View>
          <View style={[styles.tbody, styles.pl7]}>
            <Text>{lt.result_value}</Text>
          </View>
          <View style={[styles.tbody, styles.pl7]}>
            <Text>{lt.measure_unit}</Text>
          </View>
          <View style={[styles.tbody, styles.pl7]}>
            <Text>{lt.normal_value}</Text>
          </View>
        </View>
      ) : (
        <Fragment>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={[styles.tbody3, styles.pl7, styles.tbody2]}>
              <Text>{lt.parameter}</Text>
            </View>
            <View style={[styles.tbody3, styles.pl7]}>
              <Text>{lt.result_value}</Text>
            </View>
            <View style={[styles.tbody3, styles.pl7]}>
              <Text>{lt.measure_unit}</Text>
            </View>
            <View style={[styles.tbody3, styles.pl7]}>
              <Text>{lt.normal_value}</Text>
            </View>
          </View>
          {lt?.sub_values && lt?.sub_values?.length > 0 &&
            lt?.sub_values?.map((sub) => (
              <Fragment key={sub.id}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <View style={[styles.tbody, styles.pl10, styles.tbody2]}>
                    <Text>{sub.parameter}</Text>
                  </View>
                  <View style={[styles.tbody, styles.pl4]}>
                    <Text>{sub.result_value}</Text>
                  </View>
                  <View style={[styles.tbody, styles.pl7, {width: '10%'}]}>
                    <Text>{sub.measure_unit}</Text>
                  </View>
                  <View style={[styles.tbody, styles.pl7]}>
                    <Text>{sub.normal_value}</Text>
                  </View>
                </View>
              </Fragment>
            ))}
        </Fragment>
      )}
    </Fragment>
  ));

  return <>{rows}</>;
};

export default TableBody;

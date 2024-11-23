import { Page, Document, Text } from '@react-pdf/renderer';
import Title from './title';
import Detail from './detail';
import TableHead from './table-head';
import TableBody from './table-body';

import { styles } from './styles';

import { Result } from '../../../../../../types/orders/result';

interface ResultPdfProps {
  data: Result;
}

export default function ResultPdf({ data }: ResultPdfProps) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Title
          labLogo={BASE_URL + data.order?.laboratory?.logo}
          labName={data.order.laboratory.name}
          address={data.order.laboratory.address}
          rif={data.order.laboratory.document}
        />
        <Detail
          orderCode={data.order.code}
          orderDate={`${data.order.order_date} a las ${data.order?.hour}`}
          patient={data.order.patient}
        />
        <Text style={styles.labTestTitle}>{data.lab_test}</Text>
        <TableHead />
        <TableBody results={data.result_values} />
      </Page>
    </Document>
  );
}

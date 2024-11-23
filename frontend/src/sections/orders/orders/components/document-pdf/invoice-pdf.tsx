import { Page, Document, Image } from '@react-pdf/renderer';
import InvoiceTitle from './invoice-title';
import LaboratoryInfo from './laboratory-info';
import TableHead from './table-head';
import TableBody from './table-body';
import InvoiceSummary from './invoice-summary';

import { styles } from './styles';

import { Order } from '../../../../../types/orders/orders';

interface InvoicePdfProps {
  invoice: Order;
  discount: number;
  clientName: string;
  ciOrRif: string;
}

const InvoicePdf = ({ invoice, discount, clientName, ciOrRif }: InvoicePdfProps) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <Document>
      <Page
        size="FOLIO"
        style={styles.page}        
      >
        <Image style={styles.logo} src={BASE_URL + invoice.laboratory.logo} />
        <InvoiceTitle
          labName={invoice.laboratory.name}
          address={invoice.laboratory.address}
          rif={invoice.laboratory.document}
        />
        <LaboratoryInfo
          invoiceNumber={invoice.code}
          ciOrRif={ciOrRif}
          nameOrTradeName={clientName}
          invoiceDate={invoice.order_date}
          paymentCondition={invoice.payment_type}
        />
        <TableHead />
        <TableBody labTests={invoice.detail} />
        <InvoiceSummary
          taxName={invoice.tax?.name}
          tax={invoice.tax?.tax}
          discount={discount}
          total={invoice.main_total}
          secondaryTotal={invoice.secondary_total}
          mainCurrencyCode={invoice.main_currency?.code}
          secondaryCurrencyCode={invoice?.secondary_currency?.code}
        />
      </Page>
    </Document>
  );
};

export default InvoicePdf;

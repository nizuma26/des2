import Button from '@mui/material/Button';

import { BlobProvider } from '@react-pdf/renderer';

import { Order } from '../../../../../types/orders/orders';

import InvoicePdf from './invoice-pdf';
import Iconify from '../../../../../components/iconify';

interface PrintInvoiceProps {
  invoice: Order;
  discount: number;
  clientName: string;
  ciOrRif: string;
}

const PrintInvoice = ({ invoice, discount, clientName, ciOrRif }: PrintInvoiceProps) => {
  return (
    <BlobProvider
      document={
        <InvoicePdf
          invoice={invoice}
          discount={discount}
          clientName={clientName}
          ciOrRif={ciOrRif}
        />
      }
    >
      {({ url }) => (
        <a href={url ?? ''} target="_blank">
          <Button startIcon={<Iconify icon="solar:printer-bold-duotone" />}>
            Imprimir Factura
          </Button>
        </a>
      )}
    </BlobProvider>
  );
};

export default PrintInvoice;

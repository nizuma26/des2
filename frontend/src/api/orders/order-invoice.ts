import { axiosPrivate } from '../axios';

import { OrderInvoiceFormValues } from '../../types/orders/order-invoice';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const generateOrderInvoice = async (data: OrderInvoiceFormValues) => {
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  formData.append('orders', JSON.stringify(data.orders));
  const response = await axiosPrivate.post('api/orders/invoice/', formData);
  return response.data;
};

export const generateInvoicePdf = async (orderId: number) => {
  const response = await axiosPrivate.get(`api/orders/invoice/generate-pdf/${orderId}/`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'invoice.pdf'); // Nombre del archivo a descargar
  document.body.appendChild(link);
  link.click();
  link?.parentNode?.removeChild(link);
};

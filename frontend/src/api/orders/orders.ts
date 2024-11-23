import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { OrderFormValues } from '../../types/orders/orders';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newOrder = async (data: OrderFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('order_date', dayjs(data.order_date).format('YYYY-MM-DD'));
  formData.append('delivery_date', dayjs(data.delivery_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));
  formData.append('payments', JSON.stringify(data.payments));

  const response = await axiosPrivate.post('api/orders/order/', formData);
  return response.data;
};

export const editOrder = async (data: OrderFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('order_date', dayjs(data.order_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));
  formData.append('payments', JSON.stringify(data.payments));

  const response = await axiosPrivate.put(`api/orders/order/${data?.id}/`, formData);
  return response.data;
};

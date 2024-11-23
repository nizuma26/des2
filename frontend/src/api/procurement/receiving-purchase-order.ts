import { axiosPrivate } from '../axios';

import { ReceivingPurchaseFormValues } from '../../types/procurements/receiving-order';

export const newReceivingPurchaseOrder = async (data: ReceivingPurchaseFormValues) => {
  const formData = new FormData();
  formData.append('order', String(data.order));
  formData.append('status', data.status);
  formData.append('comment', data.comment);
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.post('api/procurement/receiving-purchase/', formData);
  return response.data;
};

export const editReceivingPurchaseOrder = async (data: ReceivingPurchaseFormValues) => {
  const formData = new FormData();
  formData.append('order', String(data.order));
  formData.append('status', data.status);
  formData.append('comment', data.comment);
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.put(`api/procurement/receiving-purchase/${data?.id}/`, formData);
  return response.data;
};
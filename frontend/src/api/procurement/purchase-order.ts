import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { PurchaseOrderFormValues } from '../../types/procurements/purchase-orders';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newPurchaseOrder = async (data: PurchaseOrderFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  if (data?.confirmed_date !== null) {
    formData.append('confirmed_date', dayjs(data.confirmed_date).format('YYYY-MM-DD'));
  }
  //formData.append('confirmed_date', dayjs(data.confirmed_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.post('api/procurement/purchase-order/', formData);
  return response.data;

};

export const editPurchaseOrder = async (data: PurchaseOrderFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  if (data?.confirmed_date !== null) {
    formData.append('confirmed_date', dayjs(data.confirmed_date).format('YYYY-MM-DD'));
  }
  //formData.append('required_date', dayjs(data.required_date).format('YYYY-MM-DD'));
  formData.append('confirmed_date', dayjs(data.confirmed_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.put(`api/procurement/purchase-order/${data?.id}/`, formData);
  return response.data;
};
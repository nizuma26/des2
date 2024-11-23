import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { PurchaseRequisitionFormValues } from '../../types/procurements/purchase-requisition';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newPurchaseRequisition = async (data: PurchaseRequisitionFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('required_date', dayjs(data.required_date).format('YYYY-MM-DD'));
  formData.append('request_date', dayjs(data.request_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.post('api/procurement/purchase-requisition/', formData);
  return response.data;
};

export const editPurchaseRequisition = async (data: PurchaseRequisitionFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('required_date', dayjs(data.required_date).format('YYYY-MM-DD'));
  formData.append('request_date', dayjs(data.request_date).format('YYYY-MM-DD'));
  formData.append('detail', JSON.stringify(data.detail));

  const response = await axiosPrivate.put(`api/procurement/purchase-requisition/${data?.id}/`, formData);
  return response.data;
};

export const deletePurchaseRequisition = async (id: number) => {
  const response = await axiosPrivate.delete(`api/procurement/purchase-requisition/${id}/`);
  return response.data;
};

export const changeStatus = async (id: number) => {
  const response = await axiosPrivate.post(`api/procurement/purchase-requisition/change_status/${id}/`);
  return response.data;
};

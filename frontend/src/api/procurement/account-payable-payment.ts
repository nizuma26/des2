import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { AccountPayablePaymentFormValues } from '../../types/procurements/account-payable';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newPayment = async (data: AccountPayablePaymentFormValues) => {
  
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  formData.append('payment_date', dayjs(data.payment_date).format('YYYY-MM-DD'));

  const response = await axiosPrivate.post('api/procurement/account-payable-payments/', formData);
  return response.data;
};

export const deletePayment = async (id:number) => {
  const response = await axiosPrivate.delete(`api/procurement/account-payable-payments/${id}/`)
  return response.data;
}
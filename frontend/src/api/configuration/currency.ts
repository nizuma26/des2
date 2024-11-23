import { axiosPrivate } from '../axios';

import { CurrencyFormValues } from '../../types/configuration/currency';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newCurrency = async (data: CurrencyFormValues) => {
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  data.type_currency === null && formData.append('type_currency', String(data?.type_currency));
  const response = await axiosPrivate.post('api/config/currency/', formData);
  return response.data;
};

export const editCurrency = async (data: CurrencyFormValues) => {
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  data.type_currency === null && formData.append('type_currency', String(data?.type_currency));
  const response = await axiosPrivate.put(`api/config/currency/${data.id}/`, formData);
  return response.data;
};

export const deleteCurrency = async (id?: number) => {
  const response = await axiosPrivate.delete(`api/config/currency/${id}/`);
  return response.data;
};

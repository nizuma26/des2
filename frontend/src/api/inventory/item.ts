import { axiosPrivate } from '../axios';
import { ItemFormValue } from '../../types/inventory/item';
import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newItem = async (data: ItemFormValue) => {
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  formData.append('image', data.image !== null ? data.image : '');
  const response = await axiosPrivate.post('api/inventory/item/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const editItem = async (data: ItemFormValue) => {
  const formData = new FormData();
  addValidDataToFormData(data, formData);
  formData.append('image', data.image !== null ? data.image : '');
  const response = await axiosPrivate.put(`api/inventory/item/${data.id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteItem = async (id?: number) => {
  const response = await axiosPrivate.delete(`api/inventory/item/${id}/`);
  return response.data;
};

export const getStockItems = async (itemIds: number[]) => {
  const response = await axiosPrivate.post('api/inventory/item/stock-items/', {
    itemIds: itemIds,
  });
  return response.data;
};

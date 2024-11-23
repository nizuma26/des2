import { axiosPrivate } from '../axios';

import { addValidDataToFormData } from '../../utils/add-valid-data';
import { ResultForm } from '../../types/orders/result';

export const newResult = async (data: ResultForm) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('result_values', JSON.stringify(data.result_values));
    const response = await axiosPrivate.post('api/orders/result/', formData);
    return response.data;
};

export const editResult = async (data: ResultForm) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('result_values', JSON.stringify(data.result_values));
    const response = await axiosPrivate.put(`api/orders/result/${data.id}/`, formData);
    return response.data;
};
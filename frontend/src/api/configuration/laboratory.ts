import { axiosPrivate } from '../axios';
import { Laboratory } from '../../types/configuration/laboratory';
import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newLaboratory = async (data: Laboratory) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    formData.append('logo', data.logo !== null ? data.logo : '');
    const response = await axiosPrivate.post('api/config/laboratory/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
};

export const editLaboratory = async (data: Laboratory) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    formData.append('logo', data.logo !== null ? data.logo : '');
    const response = await axiosPrivate.put(`api/config/laboratory/${data.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
};

export const deleteLaboratory = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/config/laboratory/${id}/`);
    return response.data;
};

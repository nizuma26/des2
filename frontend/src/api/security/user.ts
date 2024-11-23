import { axiosPrivate } from '../axios';
import { User } from '../../types/security/user';
import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newUser = async (data: User) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('image', data?.image !== null ? data?.image : ''); 
    formData.append('groups', String(data.groups)); 
    const response = await axiosPrivate.post('api/users/user/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
};

export const editUser = async (data: User) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('image', data.image !== null ? data.image : '');
    formData.append('groups', String(data.groups)); 
    const response = await axiosPrivate.put(`api/users/user/${data.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
};

export const deleteUser = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/users/user/${id}/`);
    return response.data;
};

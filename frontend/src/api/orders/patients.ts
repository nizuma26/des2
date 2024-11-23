import { axiosPrivate } from '../axios';

import dayjs from 'dayjs';

import { PatientFormValues } from '../../types/orders/patients';
import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newPatient = async (data: PatientFormValues) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('birthdate', dayjs(data.birthdate).format('YYYY-MM-DD'));
    formData.append('affiliations', JSON.stringify(data.affiliations));
    const response = await axiosPrivate.post('api/orders/patient/', formData);
    return response.data;
};

export const editPatient = async (data: PatientFormValues) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    formData.append('birthdate', dayjs(data.birthdate).format('YYYY-MM-DD'));
    formData.append('affiliations', JSON.stringify(data.affiliations));
    const response = await axiosPrivate.put(`api/orders/patient/${data.id}/`, formData);
    return response.data;
};
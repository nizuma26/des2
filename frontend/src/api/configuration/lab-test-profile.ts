import { axiosPrivate } from '../axios';

import { LabTestProfileFormValues } from '../../types/configuration/lab-test-profile';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newLabTestProfile = async (data: LabTestProfileFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('lab_tests', JSON.stringify(data.lab_tests));
  formData.append('prices', JSON.stringify(data.prices));

  const response = await axiosPrivate.post('api/config/lab-test-profile/', formData);
  return response.data;
};

export const editLabTestProfile = async (data: LabTestProfileFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('lab_tests', JSON.stringify(data.lab_tests));
  formData.append('prices', JSON.stringify(data.prices));

  const response = await axiosPrivate.put(`api/config/lab-test-profile/${data?.id}/`, formData);
  return response.data;
};
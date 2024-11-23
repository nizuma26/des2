import { axiosPrivate } from '../axios';

import { LabTestFormValues, LabTestType } from '../../types/configuration/lab-test';

import { addValidDataToFormData } from '../../utils/add-valid-data';

export const newLabTest = async (data: LabTestFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('parameters', JSON.stringify(data.parameters));
  formData.append('items', JSON.stringify(data.items));
  formData.append('prices', JSON.stringify(data.prices));

  const response = await axiosPrivate.post('api/config/lab-test/', formData);
  return response.data;
};

export const editLabTest = async (data: LabTestFormValues) => {

  const formData = new FormData();
  addValidDataToFormData(data, formData);
  
  formData.append('parameters', JSON.stringify(data.parameters));
  formData.append('items', JSON.stringify(data.items));
  formData.append('prices', JSON.stringify(data.prices));

  const response = await axiosPrivate.put(`api/config/lab-test/${data?.id}/`, formData);
  return response.data;
};

export const searchLabtTest = async (labTestIds: number[], labTestType?:LabTestType) => {

  const response = await axiosPrivate.post('api/config/lab-test/search-lab-test/', {
    ids: labTestIds,
    type: labTestType
  });
  
  return response.data;
};

export const searchItems = async (ids: number[]) => {

  const response = await axiosPrivate.post('api/config/lab-test/search-items/', {
    ids: ids
  });
  
  return response.data;
};

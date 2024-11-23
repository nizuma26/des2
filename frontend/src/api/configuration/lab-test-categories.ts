import { axiosPrivate } from "../axios";

import { LabTestCategory } from "../../types/configuration/lab-test-categories";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newLabTestCategory = async(data:LabTestCategory) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/lab-test-category/', formData)
    return response.data
}

export const editLabTestCategory = async(data:LabTestCategory) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/lab-test-category/${data.id}/`, formData)
    return response.data
}

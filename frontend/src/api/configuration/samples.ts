import { axiosPrivate } from "../axios";

import { Sample } from "../../types/configuration/samples";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newSample = async(data:Sample) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/sample/', formData)
    return response.data
}

export const editSample = async(data:Sample) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/sample/${data.id}/`, formData)
    return response.data
}

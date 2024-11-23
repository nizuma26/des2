import { axiosPrivate } from "../axios";

import { Tax } from "../../types/configuration/tax";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newTax = async(data:Tax) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/tax/', formData)
    return response.data
}

export const editTax = async(data:Tax) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/tax/${data.id}/`, formData)
    return response.data
}
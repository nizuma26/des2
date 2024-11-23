import { axiosPrivate } from "../axios";

import { Bank } from "../../types/configuration/banks";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newBank = async(data:Bank) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/bank/', formData)
    return response.data
}

export const editBank = async(data:Bank) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/bank/${data.id}/`, formData)
    return response.data
}

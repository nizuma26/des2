import { axiosPrivate } from "../axios";

import { Container } from "../../types/configuration/containers";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newContainer = async(data:Container) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/container/', formData)
    return response.data
}

export const editContainer = async(data:Container) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/container/${data.id}/`, formData)
    return response.data
}
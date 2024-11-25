import { axiosPrivate } from "../axios";

import { GenericValues } from "../../types";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newCategory = async(data:GenericValues) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/inventory/category/', formData)
    return response.data
}

export const editCategory = async(data:GenericValues) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/inventory/category/${data.id}/`, formData)
    return response.data
}

export const deleteCategory = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/inventory/category/${id}/`);
    return response.data;
};
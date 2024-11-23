import { axiosPrivate } from "../axios";

import { ModelFormValues } from "../../types/inventory/model";


export const newModel = async(data:ModelFormValues) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.post('api/inventory/model/', formData)
    return response.data
}

export const editModel = async(data:ModelFormValues) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.put(`api/inventory/model/${data.id}/`, formData)
    return response.data
}

export const deleteModel = async (id: number) => {
    const response = await axiosPrivate.delete(`api/inventory/model/${id}/`);
    return response.data;
};
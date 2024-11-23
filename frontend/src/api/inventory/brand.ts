import { axiosPrivate } from "../axios";

import { Generic } from "../../types";

export const newBrand = async(data:Generic) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.post('api/inventory/brand/', formData)
    return response.data
}

export const editBrand = async(data:Generic) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.put(`api/inventory/brand/${data.id}/`, formData)
    return response.data
}

export const deleteBrand = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/inventory/brand/${id}/`);
    return response.data;
};
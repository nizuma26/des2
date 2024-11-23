import { axiosPrivate } from "../axios";

import { Generic } from "../../types";

export const newMeasureUnit = async(data:Generic) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.post('api/inventory/measure_unit/', formData)
    return response.data
}

export const editMeasureUnit= async(data:Generic) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.put(`api/inventory/measure_unit/${data.id}/`, formData)
    return response.data
}

export const deleteMeasureUnit = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/inventory/measure_unit/${id}/`);
    return response.data;
};
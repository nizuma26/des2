import { axiosPrivate } from "../axios";

import { Generic } from "../../types";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newVoucher = async(data:Generic) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/payment/voucher/', formData)
    return response.data
}

export const editVoucher = async(data:Generic) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/payment/voucher/${data.id}/`, formData)
    return response.data
}

export const deleteVoucher = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/payment/voucher/${id}/`);
    return response.data;
};
import { axiosPrivate } from "../axios";

import { PaymentMethod } from "../../types/payment/payment-method";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newPaymentMethod = async(data:PaymentMethod) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/payment/payment-method/', formData)
    return response.data
}

export const editPaymentMethod = async(data:PaymentMethod) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/payment/payment-method/${data.id}/`, formData)
    return response.data
}

export const deletePaymentMethod = async (id?: number) => {
    const response = await axiosPrivate.delete(`api/payment/payment-method/${id}/`);
    return response.data;
};
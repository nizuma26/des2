import { axiosPrivate } from "../axios";

import { CashRegister } from "../../types/configuration/cash-register";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newCashRegister = async(data:CashRegister) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/config/cash-register/', formData)
    return response.data
}

export const editCashRegister = async(data:CashRegister) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/config/cash-register/${data.id}/`, formData)
    return response.data
}
import { axiosPrivate } from "../axios";

import { Supplier } from "../../types/procurements/supplier";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newSupplier = async(data:Supplier) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    const response = await axiosPrivate.post('api/procurement/supplier/', formData)
    return response.data
}

export const editSupplier = async(data:Supplier) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData);
    const response = await axiosPrivate.put(`api/procurement/supplier/${data?.id}/`, formData)
    return response.data
}

export const deleteSupplier = async(id:number) => {    
    const response = await axiosPrivate.delete(`api/procurement/supplier/${id}/`)
    return response.data
}

export const changeStatus = async(id:number) => {    
    const response = await axiosPrivate.post(`api/procurement/supplier/change_status/${id}/`)
    return response.data
}
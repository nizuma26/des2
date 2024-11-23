import { axiosPrivate } from "../axios";

import { BeginningInventoryFormData } from "../../types/beginning-inventory";
import dayjs from "dayjs";

export const newBeginningInventory = async(data:BeginningInventoryFormData) => {
    const formData = new FormData();
    formData.append('note', data.note);
    formData.append('status', data.status);
    formData.append('last_date', dayjs(data.last_date).format('YYYY-MM-DD'));
    formData.append('subtotal', String(data.subtotal));
    formData.append('total', String(data.total));
    formData.append('detail', JSON.stringify(data.detail));
    const response = await axiosPrivate.post('api/inventory/beginning-inventory/', formData)
    return response.data
}

export const editBeginningInventory = async(data:BeginningInventoryFormData) => {
    const formData = new FormData();
    formData.append('note', data.note);
    formData.append('status', data.status);
    formData.append('last_date', dayjs(data.last_date).format('YYYY-MM-DD'));
    formData.append('subtotal', String(data.subtotal));
    formData.append('total', String(data.total));
    formData.append('detail', JSON.stringify(data.detail));
    const response = await axiosPrivate.put(`api/inventory/beginning-inventory/${data.id}/`, formData)
    return response.data
}

export const toggleInventoryStatus = async(id:number) => {    
    const response = await axiosPrivate.post(`api/inventory/beginning-inventory/toggle_inventory_status/`, {id})
    return response.data
}
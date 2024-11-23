import { axiosPrivate } from "../axios";

import { Affiliation } from "../../types/orders/affiliations";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newAffiliation = async(data:Affiliation) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/orders/affiliation/', formData)
    return response.data
}

export const editAffiliation = async(data:Affiliation) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.put(`api/orders/affiliation/${data.id}/`, formData)
    return response.data
}
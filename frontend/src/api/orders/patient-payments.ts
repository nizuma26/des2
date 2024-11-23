import { axiosPrivate } from "../axios";

import { PatientPaymentFormValues } from "../../types/orders/payments";

import { addValidDataToFormData } from "../../utils/add-valid-data";

export const newPatientPayment = async(data:PatientPaymentFormValues) => {
    const formData = new FormData();
    addValidDataToFormData(data, formData)
    const response = await axiosPrivate.post('api/orders/payment/', formData)
    return response.data
}
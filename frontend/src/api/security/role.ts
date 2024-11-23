import { axiosPrivate } from "../axios";

import { Role } from "../../types/security/role";

export const newRole = async(data:Role) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.post('api/users/role/', formData)
    return response.data
}

export const editRole = async(data:Role) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    const response = await axiosPrivate.put(`api/users/role/${data.id}/`, formData)
    return response.data
}

export const deleteRole = async (id: number) => {
    const response = await axiosPrivate.delete(`api/users/role/${id}/`);
    return response.data;
};
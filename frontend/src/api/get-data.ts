import { axiosPrivate } from "./axios";

// Realiza cualquier peticion GET al servidor
export const getData = async (url: string) => {
    const response = await axiosPrivate.get(url);
    return response.data;
}
// Realiza cualquier una peticion DELETE al servidor para eliminar un objeto
export const deleteData = async (url: string) => {
    const response = await axiosPrivate.delete(url)
    return response.data;
}
// Realiza una peticion DELETE al servidor para eliminar uno o varios objetos
export const bulkDelete = async (url: string, ids: number[]) => {
    const response = await axiosPrivate.delete(url, {data: { ids }});
    return response.data;
}
// Realiza una peticion PUT para cambiar el estado de uno o muchos objetos en el servidor
export const changeStates = async (url: string, ids: number[], action: string) => {
    const response = await axiosPrivate.put(url, { ids, action });
    return response.data;
}
//Realiza una peticion PUT al servidor para hacer un borrado logico
export const moveToTrash = async (url:string, ids: number[]) => {
    const response = await axiosPrivate.put(`${url}/move-to-trash/`, { ids })
    return response.data;
}
//Realiza una peticion PUT al servidor para recuperar objetos con borrado logico
export const restoreFromTrash = async (url:string, ids: number[]) => {
    const response = await axiosPrivate.put(`${url}/restore-from-trash/`, { ids })
    return response.data;
}

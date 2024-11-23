import axios from 'axios';

import { useAuthPrivate } from '../auth/hooks/use-auth-private';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axi = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

axiosPrivate.interceptors.request.use(
    
    config => {
        const access = useAuthPrivate.getState().access
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${access}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(

    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const response = await axi.post('/auth/token/refresh/', {
            headers: "Content-Type: application/json",
            refresh: useAuthPrivate.getState().refresh,
        });
        useAuthPrivate.getState().setToken(response.data.access, response.data.refresh);
        prevRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axiosPrivate(prevRequest);
      }

      console.log(error);

      return Promise.reject(error);
    }
  );
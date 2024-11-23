import {axi} from '../../api/axios';
import { useAuthPrivate } from './use-auth-private';

const useRefreshToken = () => {

    const refresh = useAuthPrivate(state => state.refresh);
    const setToken = useAuthPrivate(state => state.setToken);

    const refreshToken = async () => {
        const response = await axi.post('/auth/token/refresh/', {
            headers: "Content-Type: application/json",
            withCredentials: true,
            refresh: refresh,
        });
        setToken(response.data.access, response.data.refresh);
        return response.data.access;
    }
    return refreshToken;
};

export default useRefreshToken;
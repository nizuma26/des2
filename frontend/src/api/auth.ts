import { axi } from './axios';

export const loginRequest = async ({username, password}: {username:string, password:string}) => {
  const response = await axi.post( 'auth/login/', { username, password });
  return response;
};

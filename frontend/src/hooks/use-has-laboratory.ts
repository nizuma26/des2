import { useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

import { useRouter } from '../routes/hooks';

import { TokenDecode } from '../types';

import { useAuthPrivate } from '../auth/hooks/use-auth-private';

import ToastUtilities from '../components/toast';

// ------------------------------------------------------

export const useHasLaboratory = () => {
  const token = useAuthPrivate((state) => state.access);

  const router = useRouter();

  useEffect(() => {
    if (token) {
      try {
        const tokenDecode: TokenDecode = jwtDecode(token);

        if (!tokenDecode.laboratory_id) {
          ToastUtilities.info({
            msg: 'Debe estar asociado a un laboratorio para ingresar a este módulo',
          });
          router.back();
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        ToastUtilities.info({ msg: 'Token inválido. Por favor, inicie sesión nuevamente.' });
        router.back();
      }
    } else {
      ToastUtilities.info({ msg: 'No se encontró ningún token. Por favor, inicie sesión.' });
      router.back();
    }
  }, [token, router]);
};

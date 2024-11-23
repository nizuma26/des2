import { useQuery } from '@tanstack/react-query';

import { getData } from '../../api/get-data';

export const QUERY_KEYS = {
  PERMISSIONS: 'userPermissions',
};

export const useUserPermissions = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.PERMISSIONS],
    queryFn: () => getData(`api/users/user/permissions/`),
    staleTime: 15 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false, // No refetch al enfocar la ventana
    refetchOnReconnect: true, // Refetch al reconectar la red
    retry: 0, // Sin reintentos en caso de error
  });
  return query;
};

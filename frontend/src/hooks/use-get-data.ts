import { useQuery } from '@tanstack/react-query';

import { getData } from '../api/get-data';
import ToastUtilities from '../components/toast/toast-manager';

interface useGetQuery {
  url: string;
  queryKey: unknown[];
  staleTime?: number;
  enabled?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retry?: number;
}
const GC_TIME = 5 * 60 * 1000

export const useGetData = ({
  url,
  queryKey,
  staleTime = 15,
  enabled=true,
  gcTime=GC_TIME,
  refetchOnWindowFocus=false,
  refetchOnReconnect=true,
  retry=3,
}: useGetQuery) => {
  
  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => getData(url),
    staleTime: staleTime * 1000,
    enabled: enabled,
    gcTime: gcTime,
    refetchOnWindowFocus: refetchOnWindowFocus,
    refetchOnReconnect: refetchOnReconnect,
    retry: retry,
  });
  if (query.isError) ToastUtilities.error({msg:'Ha ocurrido un error al cargar los datos' })

  return query

};

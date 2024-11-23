import { useQueryClient } from '@tanstack/react-query';

import ToastUtilities from '../components/toast';

interface UseMutateDataProps {
  promise: Promise<any>;
  onSuccess?: (response: Record<string, any>) => void;
  onError?: (error: Error) => void;
}

export const useMutateData = () => {
  const queryClient = useQueryClient();

  const submit = ({ promise, onSuccess, onError }: UseMutateDataProps) => {
    ToastUtilities.promise({
      promise: promise,
      success: (response: Record<string, any>) => {
        return onSuccess && onSuccess(response);
      },
      error: (error: Error) => {
        return onError && onError(error);
      },
    });
  };

  const append = <T extends Record<string, any>>({
    queryKey,
    data,
  }: {
    queryKey: unknown[];
    data: T;
  }) => {
    queryClient.setQueryData<T[]>(queryKey, (oldData) => {
      if (oldData) {
        const newData = [...oldData];
        newData.unshift(data);
        return newData;
      }
    });
  };
  //Optiene la data en cache y y filtra todos los datos que no coincidan con el id pasado para removerlo
  const removeData = <T extends { id: number }>(queryKey: unknown[], id: number) => {
    queryClient.setQueryData<T[]>(queryKey, (oldData) => {
      if (oldData) {
        const newData = oldData;
        return newData.filter((item) => item.id !== id);
      }
    });
  };
  const updateData = <T extends Record<string, any>>({
    queryKey,
    id,
    fields,
    values,
    many = true,
  }: {
    queryKey: unknown[];
    id?: number;
    fields: (keyof T)[];
    values: any[];
    many?: boolean;
  }) => {
    queryClient.setQueryData<T[] | T>(queryKey, (oldData) => {
      if (!oldData) return;      
      else if (many && !!id === false) return
      else if (many && !Array.isArray(oldData)) return oldData;
      try {
        if (many) {
          return oldData.map((row:T) => {
            if (row?.id === id) {
              const updateItem = { ...row };
  
              fields.forEach((field, i) => {
                updateItem[field] = values[i];
              });
              return updateItem;
            }
            return row;
          });
        } else {        
            const item = {...oldData}
            fields.forEach((field, i) => {
              item[field] = values[i];
            });
            return item
  
        }
      } catch (e) {
        return oldData
      }
      
    });
  };
  const invalidateQueries = ({ queryKey }: { queryKey: unknown[] }): Promise<void> => {
    return queryClient.invalidateQueries({ queryKey: queryKey });
  };

  return { submit, append, removeData, updateData, invalidateQueries };
};

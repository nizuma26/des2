import { UseFormSetError, Path } from 'react-hook-form';

//Para setear los errores de los campos que vienen del backend a los inputs del formulario
export const validateFieldErrors = <T extends Record<string, any>>(
  fields: T,
  error: Error,
  setError: UseFormSetError<T>
) => {
  const typeError = typeof error;
  if (typeError === 'object' && error !== null) {
    Object.entries(error).forEach(([key, value]) => {
      if (fields?.hasOwnProperty(key)) {
        return setError(key as Path<T>, { type: 'custom', message: value });
      }
    });
  }
};

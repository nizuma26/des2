// Validar que el valor no sea vacío, null o indefinido
export const addValidDataToFormData = <T extends Record<string, any>>(
  data: T,
  formData: FormData
) => {
  try {
    return Object.entries(data).forEach(([key, value]) => {
      const typeValue = typeof value;
      if (
        value !== null &&
        value !== undefined &&
        (typeValue === 'string' || typeValue === 'number' || typeValue === 'boolean')
      ) {
        formData.append(key, String(value));
      }
    });
  } catch (error) {
    console.error('Error adding data to FormData: ', error);
    return;
  }
};

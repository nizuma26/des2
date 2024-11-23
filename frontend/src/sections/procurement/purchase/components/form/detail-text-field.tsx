//@mui
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';

//-------------------------------------------------------------

interface DetailTextFieldProps {
  indexField: number;
  name: string;
  placeholder: string;
  messageRequired?: string;
}

export default function DetailTextField({
  indexField,
  name,
  placeholder,
  messageRequired = 'Este campo es obligatorio',
}: DetailTextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextField
        size="small"
        type="number"
        placeholder={placeholder}
        {...register(`detail.${indexField}.${name}`, {
          required: messageRequired,
        })}
      />
    </>
  );
}

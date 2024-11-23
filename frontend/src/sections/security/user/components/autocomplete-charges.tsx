import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ChargesAutocomplete() {

    const charges = [
        { label: 'Charge 1', value: 'Charge 1' },
    ]

  return (
    <Autocomplete
      disablePortal
      options={charges}
      renderInput={(params) => <TextField {...params} label="Seleccione un cargo" />}
      fullWidth
    />
  );
}
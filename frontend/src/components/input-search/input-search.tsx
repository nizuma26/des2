import { useState, ChangeEvent } from 'react';
//@mui
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

import Iconify from '../iconify';

interface InputSearch {
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  clean: () => void;
  sx?: SxProps;
}

export default function InputSearch({
  label = 'Buscar...',
  onChange,
  clean,
  sx,
}: InputSearch) {
  const [search, setSearch] = useState('');

  const clearSearch = () => {
    setSearch('');
    clean();
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (onChange) onChange(event);
  };

  const InputProps = search
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch} edge="end">
              <Iconify icon={'ic:sharp-cancel'} />
            </IconButton>
          </InputAdornment>
        ),
      }
    : {};

  return (
      <TextField
        name="search"
        type='search'
        label={label}
        value={search}
        onChange={handleSearch}
        sx={{
          ...sx,
        }}
      />
      
  );
}

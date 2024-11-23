// @mui
import { useState, useRef, ChangeEvent, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../components/iconify';

type Props = {
  onChange?: (file: File | null) => void;
  defaultPreview?: string | File | null;
  register?: any;
};

const Dropzone = ({ onChange, defaultPreview='' }: Props) => {

  const [filePreview, setFilePreview] = useState('');

  const [defaultFilePreview, setDefaultPreview] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (defaultPreview && typeof defaultPreview === 'string') {
      setDefaultPreview(defaultPreview);
    }}, [defaultPreview]);

  const setFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      setDefaultPreview(''); 
      if (onChange) onChange(file);
    }
  };

  const removeFile = () => {
    setFilePreview('');
    setDefaultPreview('');
    if (onChange) onChange(null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const previewImage = (
    <>
      <Box
        component="img"
        src={filePreview ? filePreview : BASE_URL+defaultFilePreview}
        alt="Empty"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: 9,
          borderRadius: '50%',
          position: 'absolute',
        }}
      />
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          zIndex: 9,
          color: '#ffffff',
          position: 'absolute',
          bgcolor: 'rgba(22, 28, 36, 0.64)',
          transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          opacity: 0,
          '&:hover': {
            opacity: 1,
          },
        }}
        onClick={handleClick}
      >
        <Iconify sx={{ width: 32, height: 32 }} icon="solar:camera-add-bold" />
        <Typography component="span" sx={{ fontSize: '0.75rem' }}>
          Cambiar Imagen
        </Typography>
      </Stack>
    </>
  );

  return (
    <>
      <Box
        sx={{
          padding: '8px',
          margin: 'auto',
          width: 144,
          height: 144,
          cursor: 'pointer',
          borderRadius: '50%',
          border: '1px dashed rgba(145, 158, 171, 0.2)',
        }}
        role="presentation"
      >
        <input
          type="file"
          name='image'
          ref={inputRef}
          style={{
            display: 'none',
          }}
          onChange={setFile}
        />
        <Box width="100%" height="100%" borderRadius="50%" position="relative">
          {filePreview || defaultFilePreview ? (
            <div>
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: 4,
                  borderRadius: '50%',
                  zIndex: 10,
                  bgcolor: 'rgba(22, 28, 36, 0.50)',
                  '&:hover': {
                    bgcolor: 'rgba(22, 28, 36, 0.72)',
                  },
                }}
                onClick={removeFile}
              >
                <Iconify icon="mdi:remove" width={14} sx={{ color: 'white' }} />
              </IconButton>
              {previewImage}
            </div>
          ) : (
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                zIndex: 9,
                borderRadius: '50%',
                position: 'absolute',
                color: 'action.active',
                bgcolor: 'action.hover',
                transition: 'all 0.2s',
                '&:hover': {
                  opacity: 0.72,
                },
              }}
              onClick={handleClick}
            >
              <Iconify sx={{ width: 32, height: 32 }} icon="solar:camera-add-bold" />
              <Typography component="span" sx={{ fontSize: '0.75rem' }}>
                Subir Imagen
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>
      <Typography
        component="span"
        margin="12px auto 0px"
        lineHeight={1.5}
        fontSize="0.75rem"
        color="action.active"
        textAlign="center"
        display="block"
      >
        Permitido *.jpeg, *.jpg, *.png, *.gif
        <br />
        tamaño máximo de 3MB
      </Typography>
    </>
  );
};

export default Dropzone;

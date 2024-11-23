import { useState } from 'react';
//@Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { newRole, editRole } from '../../../../api/security/role';

import { Role } from '../../../../types/security/role';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../routes/hooks';

import PermissionList from './permission-list';
import Iconify from '../../../../components/iconify';
import { RouterLink } from '../../../../routes/components';

//--------------------------------------------------------

interface RoleFormProps {
  values: Role;
  invalidateQuery: () => void;
}

export default function RoleForm({ values, invalidateQuery }: RoleFormProps) {

  const [selected, setSelected] = useState<number[]>(values?.permissions);

  const form = useForm<Role>({
    defaultValues: values,
  });

  const router = useRouter();

  const mutate = useMutateData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const isEdit = values && values.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editRole : newRole,
  });

  const onSubmit = (data: Role) => {
    const newData = {
      ...data,
      permissions: [...selected],
    };
    mutate.submit({
      promise: mutation.mutateAsync({ ...newData }),
      onSuccess: () => {
        invalidateQuery();
        router.push('/role');
      },
    });
  };

  const handleToggle = (id: number) => {
    const currentIndex = selected.indexOf(id);
    const newChecked = [...selected];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelected(newChecked);
  };

  const selectAll = (ids:number[]) => {
    const checkedAll = ids
    setSelected(checkedAll)
  }

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12} lg={12}>
        <Card sx={{ overflow: 'visible' }}>
          <Box
            component="form"
            sx={{
              p: 3,
            }}
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            autoComplete='off'
            noValidate
          >
            <Box
              sx={{
                columnGap: 3,
                rowGap: 4,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              <TextField
                fullWidth
                defaultValue={values?.name}
                label="Nombre"
                {...register('name', {
                  required: 'El nombre es requerido',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>
            <Box width={1}>
              <PermissionList
                handleToggle={handleToggle}
                selectAll={selectAll}
                selected={selected}
              />
            </Box>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              gap={1}
              mt={5}
              sx={{
                '@media (max-width: 547px)': {
                  flexDirection: 'column',
                },
              }}
            >              
              <LoadingButton
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                loading={mutation.isPending}
                type="submit"
              >
                Guardar
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                loading={mutation.isPending}
                type="submit"
              >
                Guardar y crear otro
              </LoadingButton>
              <Button
                variant="outlined"
                color="primary"
                href="/role"
                component={RouterLink}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

import { lazy, Suspense } from 'react';
//@mui
import IconButton from '@mui/material/IconButton';

import { FieldValues, useFormContext } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';
import { useDialogStore } from '../../../components/dialog';

import { SupplierAutocompleteProps, SupplierOptions } from './types';
import { Supplier } from '../../../types/procurements/supplier';

import Iconify from '../../../components/iconify';
import { LoadModalSekeleton } from '../../../components/skeleton';
import { ControlledAutocomplete } from '../../../components/controlled';
const CreateSupplierDialog = lazy(() => import('./create-supplier-dialog'));

const SupplierAutocomplete = <TField extends FieldValues>({
  control,
}: SupplierAutocompleteProps<TField>) => {
  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/supplier/active_suppliers/',
    queryKey: ['active_suppliers'],
  });

  const { setValue } = useFormContext();

  const options = data.map((i: SupplierOptions) => {
    return { value: i.id, label: `${i.rif} / ${i.trade_name}` };
  });

  const showDialog = useDialogStore.getState().showDialog;

  const onSelected = (value: string | null) => {
    const supplier = value
      ? data.find((i: Supplier) => {
          return Number(value) === i.id;
        }) ?? 0.0
      : 0.0;
    setValue('credit_days', Number(supplier?.credit_days));
    setValue('credit_limit', Number(supplier?.credit_limit));
  };

  const adornment = (
    <IconButton
      color="primary"
      size="small"
      edge="end"
      onClick={() =>
        showDialog(
          <Suspense fallback={<LoadModalSekeleton height={450} />}>
            <CreateSupplierDialog />
          </Suspense>,
          'md'
        )
      }
    >
      <Iconify icon="icon-park-outline:plus" />
    </IconButton>
  );

  return (
    <ControlledAutocomplete
      control={control}
      name="supplier"
      options={options}
      label="Proveedor"
      requiredMessage="Debe seleccionar un proveedor"
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};

export default SupplierAutocomplete;

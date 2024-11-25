import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { usePathname } from '../../../../../routes/hooks';

import { SupplierSearchProps } from './types';
import { AutocompleteOptions } from '../../../../../types';
import { SupplierList, Supplier } from '../../../../../types/procurements/supplier';

import { useSearch } from '../../../../../hooks/use-search';
import { useSupplier } from './use-supplier';

import { useDialogStore } from '../../../../../components/dialog';
import ToastUtilities from '../../../../../components/toast';
import { PlusIcon } from '../../../../../components/iconify/default-icons';
import CustomTooltip from '../../../../../components/custom-tooltip';
import CreateSupplierDialog from './create-supplier-dialog';
import ControlledAutocomplete from '../../../../../components/controlled/controlled-autocomplete';

//------------------------------------------------------------------------------------

type SupplierSearch = Omit<SupplierList, 'is_active'> & {
  address: string;
  credit_limit: number;
  credit_days: number;
}

export default function SupplierSearch({ setSupplierId, control }: SupplierSearchProps) {
  const showDialog = useDialogStore((state) => state.showDialog);

  const { setSupplier } = useSupplier();
  const {
    data = [] as SupplierSearch[],
    isLoading,
    hasError,
    autocomplete,
    setData,
  } = useSearch({
    method: 'GET',
    url: 'api/procurement/purchase-order/search-supplier/',
    delay: 300,
    minLength: 2,
  });

  const options = data.map((p) => {
    return { value: p.id, label: `${p.trade_name} / ${p.rif}` };
  });

  if (hasError) ToastUtilities.error({ msg: 'Ha ocurrido un error al consultar los datos' });

  const onChange = (selected: AutocompleteOptions | null) => {
    const supplierSelected =
      data?.find((opt: SupplierSearch) => {
        return opt.id === selected?.value;
      }) ?? null;
    setSupplier(supplierSelected);
    setSupplierId(supplierSelected?.id ?? null);
  };

  const onInputChange = (value: string, reason: 'input' | 'reset' | 'clear') => {
    if (reason === 'input') autocomplete({ value });
  };

  const pathname = usePathname();

  useEffect(() => {
    setSupplier(null);
  }, [pathname]);

  const openDialog = () => {
    showDialog(
      <CreateSupplierDialog
        onSubmit={(data: Supplier) => {
          setSupplier({ ...data }), setSupplierId(data?.id ?? null);
          setData([{ ...data }]);
        }}
      />,
      'md'
    );
  };

  return (
    <Box width={1} display="flex" alignItems="center" gap={1}>
      <ControlledAutocomplete
        control={control}
        name="supplier"
        options={options}
        label="Proveedor"
        placeholder="Ingrese una descripción..."
        isRequired={true}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSelected={onChange}
      />
      <CustomTooltip title="Crear Proveedor">
        <Fab
          variant="circular"
          size="small"
          color="primary"
          aria-label="add"
          sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: 3 }}
          onClick={openDialog}
        >
          <PlusIcon />
        </Fab>
      </CustomTooltip>
    </Box>
  );
}

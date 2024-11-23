//@mui
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useForm, useFormContext } from 'react-hook-form';

import { useDialogStore } from '../../../../components/dialog';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { BaseModalProps } from '../../../../types';
import { PurchaseDetail } from '../../../../types/procurements/purchase';

import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import ItemSummary from './item-summary';
import ItemCost from './item-cost';

//-------------------------------------------------------------------

interface ItemModalFormProps extends BaseModalProps {
  item: PurchaseDetail;
  indexItem?: number;
  addOrUpdate: (data: PurchaseDetail, index?: number) => void;
  clearSelectedItem?: () => void;
  action?: 'add' | 'edit';
}

export default function ItemModalForm({
  item,
  indexItem = 0,
  addOrUpdate,
  clearSelectedItem = () => {},
  action = 'add',
  onClose = () => {},
}: ItemModalFormProps) {
  const form = useForm<PurchaseDetail>({
    defaultValues: item,
  });

  const purchaseForm = useFormContext();

  const exchange_rate = purchaseForm.getValues('exchange_rate');

  const { removeData } = useMutateData();

  const {
    register,
    formState: { errors },
    setValue,
    control,
    handleSubmit,
  } = form;

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog(), onClose && onClose();
  };

  const setValuesItemSummary = (
    subtotalBs: number,
    totalBs: number,
    selectedCurrencyCost: number,
    selectedCurrencyTotal: number,
    costWithTax: number
  ) => {
    setValue('subtotal_bs', subtotalBs);
    setValue('total_bs', totalBs);
    setValue('selected_currency_total', selectedCurrencyTotal);
    setValue('selected_currency_cost', selectedCurrencyCost);
    setValue('cost_with_tax', costWithTax);
  };

  const onSubmit = (data: PurchaseDetail) => {
    const getItem = {
      item_id: data.item_id,
      item: data.item,
      item_image: data.item_image,
      item_code: data.item_code,
      item_category: data.item_category,
      quantity: data.quantity,
      cost_bs: data.cost_bs,
      selected_currency_cost: data.selected_currency_cost,
      tax: data.tax,
      discount: data.discount,
      subtotal_bs: data.subtotal_bs,
      total_bs: data.total_bs,
      selected_currency_total: data.selected_currency_total,
      cost_with_tax: data.cost_with_tax,
    };
    if (action === 'add') {
      addOrUpdate(getItem);
    } else {
      addOrUpdate(getItem, indexItem);
      handleClose();
    }
    const laboratory_id = purchaseForm.getValues('laboratory');
    removeData(['stock-items', laboratory_id], data.item_id);
    clearSelectedItem();
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const typeAction =
    action === 'add'
      ? {
          titleModal: 'Agregar artículo al detalle',
          iconModal: 'eva:plus-fill',
          titleButton: 'Agregar artículo',
        }
      : {
          titleModal: 'Editar artículo',
          iconModal: 'fluent:edit-16-filled',
          titleButton: 'Guardar cambios',
        };

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        {action === 'add' && (
          <IconButton onClick={clearSelectedItem}>
            <Iconify icon="ic:round-arrow-back" width={22} sx={{ opacity: 0.86 }} />
          </IconButton>
        )}
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon={typeAction.iconModal} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {typeAction.titleModal}
      </DialogTitle>
      <form id="add-item-form" onSubmit={handleSubmit(onSubmit)} className="scrollbar">
        <DialogContent sx={{ px: 1 }}>
          <Stack direction={{ sm: 'column', md: 'row' }} alignItems="center" gap={2} px={3} mb={4}>
            <Avatar
              alt={item.item_code}
              variant="rounded"
              src={BASE_URL + item.item_image}
              sx={{ width: 96, height: 96, boxShadow: 1 }}
            />
            <ListItemText>
              <Typography variant="subtitle2">{item.item}</Typography>
              <Typography variant="subtitle2">{item.item_category}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.item_code}
              </Typography>
            </ListItemText>
            <ItemSummary
              control={control}
              setValuesItemSummary={setValuesItemSummary}
              exchange_rate={exchange_rate}
            />
          </Stack>
          <Stack width={1} px={3} gap={3}>
            <TextField
              defaultValue={item.quantity}
              fullWidth
              type="number"
              label="Cantidad"
              {...register('quantity', {
                required: 'Debe ingresar una cantidad',
                min: { value: 1, message: 'La cantidad debe ser mayor a 0' },
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
            <TextField
              defaultValue={item.tax}
              fullWidth
              type="number"
              label="Impuesto"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              {...register('tax', {
                required: 'Debe ingresar un porcentaje',
                min: { value: 0, message: 'El impuesto no puede ser inferior a 0' },
                max: { value: 100, message: 'El impuesto no puede ser superior a 100' },
              })}
              error={!!errors.tax}
              helperText={errors.tax?.message}
            />
            <TextField
              defaultValue={item.cost_bs}
              fullWidth
              label="Costo sin impuesto"
              InputProps={{
                startAdornment: <InputAdornment position="start">Bs</InputAdornment>,
              }}
              {...register('cost_bs', {
                required: 'Debe ingresar un precio',
                min: { value: 1, message: 'El costo debe ser mayor a 0' },
              })}
              error={!!errors.cost_bs}
              helperText={errors.cost_bs?.message}
            />
            <ItemCost control={control} />

            <TextField
              defaultValue={item.discount}
              fullWidth
              label="Descuento"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              {...register('discount', {
                required: 'Debe ingresar un porcentaje',
                min: { value: 0, message: 'El descuento no puede ser inferior a 0' },
                max: { value: 100, message: 'El descuento no puede ser superior a 100' },
              })}
              error={!!errors.discount}
              helperText={errors.discount?.message}
            />
          </Stack>
        </DialogContent>
      </form>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Button variant="contained" type="submit" form="add-item-form" color="inherit">
          {typeAction.titleButton}
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

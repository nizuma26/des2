import { Suspense, lazy } from 'react';
//@mui
import IconButton from '@mui/material/IconButton';

import { PurchaseDetail } from '../../../../../types/procurements/purchase';

import { useAlert } from '../../../../../components/alert';
import { useDialogStore } from '../../../../../components/dialog';

import { LoadModalSekeleton } from '../../../../../components/skeleton';
import Iconify from '../../../../../components/iconify';
import { useQueryClient } from '@tanstack/react-query';

const ItemModal = lazy(() => import('../../../common/item-modal/item-modal'))

interface AdornementAutocompleteProps {
  addOrUpdate: (data:PurchaseDetail, index?:number) => void;
  remove: () => void;
  numberItems: number;
  itemIds: number[];
  laboratory_id: number;
}

const AdornementAutocomplete = ({ addOrUpdate, remove, numberItems, itemIds, laboratory_id }: AdornementAutocompleteProps) => {

  const { showAlert } = useAlert();

  const queryClient = useQueryClient();

  const showDialog = useDialogStore.getState().showDialog;

  const removeAll = () => {
    remove()
    queryClient.invalidateQueries({queryKey: ['stock-items', laboratory_id]})
  }

  const removeAllItems = () => {
    if (numberItems <= 0) return;


    showAlert({
      content: '¿Esta seguro de remover todos los artículos de su detalle?',
      fn: removeAll,
    });
  };

  const itemModal = (
  <Suspense fallback={<LoadModalSekeleton height={450} />}>
    <ItemModal addOrUpdate={addOrUpdate} laboratoryId={laboratory_id} itemIds={itemIds} />
  </Suspense>
  )

  return (
    <>
      <IconButton color="primary" onClick={() => showDialog(itemModal, 'md')}>
        <Iconify icon="ion:search" />
      </IconButton>
      <IconButton color="primary" onClick={removeAllItems}>
        <Iconify icon="solar:trash-bin-minimalistic-bold" />
      </IconButton>
    </>
  );
};

export default AdornementAutocomplete;

import { useFormContext, useWatch } from 'react-hook-form';

import AsyncAutocomplete from '../../../../../components/async-autocomplete';
import AdornementAutocomplete from './adornement-autocomplete';

import { PurchaseDetail } from '../../../../../types/procurements/purchase';

interface AutocompleteItemsProps {
  addOrUpdate: (data: PurchaseDetail) => void;
  remove: () => void;
  numberItems: number;
  itemIds: number[]
}

function AutocompleteItems({ addOrUpdate, remove, numberItems, itemIds }: AutocompleteItemsProps) {

  const { control } = useFormContext();

  const laboratory_id = useWatch({
    name: 'laboratory',
    control: control,
  });

  return (
    <AsyncAutocomplete
      options={{
        method: 'POST',
        url: 'api/inventory/item/stock-items/',
        body: { laboratory_id: laboratory_id, itemIds: itemIds },
        delay: 300,
        minLength: 3,
      }}
      onChange={addOrUpdate}
      getOptionLabel={(option: PurchaseDetail) => `${option?.code} - ${option?.name}`}
      clearOptions
      clearOnSelect
      adornement={<AdornementAutocomplete addOrUpdate={addOrUpdate} remove={remove} numberItems={numberItems} itemIds={itemIds} laboratory_id={laboratory_id} />}
    />
  );
}

export default AutocompleteItems;

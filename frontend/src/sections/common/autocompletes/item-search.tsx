import Box from '@mui/material/Box';

import { ItemSearchProps } from './types';
import { ItemInventory } from '../../../types/inventory/item';

import AsyncAutocomplete from '../../../components/async-autocomplete';
import ShowDialog from '../dialogues/items/show-dialog';

export default function ItemSearch({ itemIds, onSelected }: ItemSearchProps) {
  return (
    <Box width={1} display="flex" alignItems="center" gap={2}>
      <AsyncAutocomplete
        options={{
          method: 'POST',
          url: 'api/inventory/item/stock-items/',
          body: { itemIds: itemIds },
          delay: 300,
          minLength: 3,
        }}
        getOptionLabel={(option: ItemInventory) => `${option?.code} - ${option?.name}`}
        clearOptions
        clearOnSelect
        onChange={(data: ItemInventory) => onSelected(data)}
      />
      <ShowDialog itemIds={itemIds} onSelected={onSelected} />
    </Box>
  );
}

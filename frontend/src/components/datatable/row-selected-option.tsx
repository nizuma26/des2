import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import { RowSelectedOptions } from './types';

import { useAlert } from '../alert';

import CustomTooltip from '../custom-tooltip';
import Iconify from '../iconify';

interface Option extends RowSelectedOptions {
  selected: Array<number | string>;
  selectAll: (checked: boolean) => void;
}

const RowSelectedOption = ({
  tooltip = 'opción',
  icon = 'mi:options-vertical',
  alertOptions = {},
  fn,
  selected,
  selectAll,
}: Option) => {
  const { showAlert } = useAlert();

  const onClick = () => {
    alertOptions?.disable
      ? fn(selected, selectAll)
      : showAlert({
          title: alertOptions?.title,
          content: alertOptions?.content ?? 'Esta seguro de ejecutar la siguiente acción',
          icon: alertOptions?.icon,
          fn: () => fn(selected, selectAll),
        });
  };

  return (
    <Box pr={1}>
      <CustomTooltip title={tooltip}>
        <IconButton sx={{ color: 'primary.main' }} onClick={onClick}>
          <Iconify icon={icon} width={18} />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
};

export default RowSelectedOption;

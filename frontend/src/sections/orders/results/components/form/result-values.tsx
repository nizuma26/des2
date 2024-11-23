import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ParameterTableResult from './parameter-table-result';


// ------------------------------

export default function ResultValues() {
  return (
    <Stack direction="row" width={1}>
      <Box width={1}>
        <ParameterTableResult />
      </Box>
    </Stack>
  );
}

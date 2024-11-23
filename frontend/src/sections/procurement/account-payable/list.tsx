import Box from "@mui/material/Box";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography'

import { BREADCRUMB_LIST_PAGE } from "./context";

import Breadcrumb from "../../../components/breadcrumb/breadcrumb";

import DebtTableWithSuppliers from "./components/debt-table-with-suppliers";

// ------------------------------------------------------------------------------

const AccountsPayableList = () => (
    <Container component='section' maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Cuentas por pagar</Typography>
          <Breadcrumb options={BREADCRUMB_LIST_PAGE} />          
        </Box>
      </Stack>
      <Card>
        <CardHeader title='Tabla de deudas' />
        <DebtTableWithSuppliers />
      </Card>
    </Container>
)

export default AccountsPayableList;
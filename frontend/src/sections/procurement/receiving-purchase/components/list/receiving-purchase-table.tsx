import { SyntheticEvent, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Tabs, CustomTabPanel } from '../../../../../components/tabs';
import PendingPurchasesTable from './pending-purchases-table';
import PartiallyReceivedPurchaseTable from './partially-received-purchase-table';

// ------------------------------------------------------

export default function ReceivingPurchaseTable() {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        options={[
          { label: 'Ordenes Pendientes', value: 0 },
          { label: 'Parcialmente recibidas', value: 1 },
        ]}
      />
      <CardContent sx={{ px:0 }}>
        <CustomTabPanel value={value} name={0}>
          <PendingPurchasesTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} name={1}>
          <PartiallyReceivedPurchaseTable />
        </CustomTabPanel>
      </CardContent>
    </Card>
  );
}

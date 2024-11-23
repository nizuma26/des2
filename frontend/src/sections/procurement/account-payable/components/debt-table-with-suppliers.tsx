//@mui

import { useGetData } from '../../../../hooks/use-get-data';

import { DEBT_SUPPLIER_COLUMNS, QUERY_KEYS } from '../context';

import { DebtSupplier } from '../../../../types/procurements/account-payable';

import { MuiDatatable } from '../../../../components/datatable';
import { useDialogStore, MuiDialog } from '../../../../components/dialog';
import AccountsPayableDialog from './accounts-payable-dialog';

//-------------------------------------------------------------------

export default function DebtTableWithSuppliers() {

  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/debt-to-suppliers/',
    queryKey: [QUERY_KEYS.DEBT_SUPPLIERS],
  });

  const showDialog = useDialogStore.getState().showDialog;

  const showPaymentDialogForm = (supplier:DebtSupplier) => {
    showDialog(
        <AccountsPayableDialog
          supplierId={supplier.id}
          supplierName={supplier.trade_name}
          totalDebt={supplier.total_debt}          
        />,
      'md',
      true
    );
  };


  const customCell = [
    {
      columnIndex: 4,
      render: (data: DebtSupplier, rowIndex: number) => <>{data?.total_debt?.toFixed(2)}</>,
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={DEBT_SUPPLIER_COLUMNS}
        options={{ checkbox: false }}
        loading={isLoading}
        customCell={customCell}
        onSelectedRow={showPaymentDialogForm}
      />
      <MuiDialog />
    </>
  );
}

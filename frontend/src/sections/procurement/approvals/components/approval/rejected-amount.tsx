import { Control, useWatch } from 'react-hook-form';

import { PurchaseRequisitionFormValues } from '../../../../../types/procurements/purchase-requisition';

import Label from '../../../../../components/label';

interface RejectedAmountProps {
  rowIndex: number;
  quantityRequested: number;
  control: Control<PurchaseRequisitionFormValues>;
}

function RejectedAmount({ rowIndex, quantityRequested, control }: RejectedAmountProps) {

  const approvedAmount = useWatch({
    control: control,
    name: `detail.${rowIndex}.approved_amount`,
  });

  const isDifferent = approvedAmount != quantityRequested

  const rejectedAmount = isDifferent ? quantityRequested - (approvedAmount ?? 0) : quantityRequested;

  const color = isDifferent ? 'error' : 'success';

  return <Label color={color}>{rejectedAmount}</Label>;
}

export default RejectedAmount;

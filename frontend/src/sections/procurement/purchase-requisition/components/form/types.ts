import { PurchaseRequisitionFormValues } from "../../../../../types/procurements/purchase-requisition";

export interface PurchaseRequisitionFormProps {
    values: PurchaseRequisitionFormValues;
    laboratoryName: string;
    requester: string;
    invalidateQuery: () => void;
  }
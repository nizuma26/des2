import { LabTest, PendingOrder } from "../../../../../types/orders/result";

export interface ChildRowProps {
    order: PendingOrder;
    onClick: (order:PendingOrder, labTest: LabTest) => void;
}

export interface ItemProps {
    orderId: number;
    labTest: LabTest;
    onClick: () => void;
    enabledRefetch: boolean;
}
import { OrderList } from "../../orders/orders";

export type OrderByCompany = Omit<OrderList, 'status'> & {
    amount_paid: number;
    balance: number;
    lab_tests: number;
}
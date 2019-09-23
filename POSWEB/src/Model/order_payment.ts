import { BaseModel } from '../Model/Base-model';
import { payment_method } from './payment_method';
export class order_payment extends BaseModel {
    date: string;
    order_no: number;
    total_amount: number = 0;
    card_amount: number = 0;
    cash_amount: number = 0;
    credit_amount: number = 0;
    balance_amount: number = 0;
    payment_method_id: number;
    payment_method: payment_method;
}